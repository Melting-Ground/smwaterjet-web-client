const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const { File } = require("node:buffer");

const source = fs.readFileSync("src/app/_hooks/useFormData.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function makeForm({ failSave = false, failDelete = false, url = "/notices" } = {}) {
  const calls = [];
  const messages = [];
  let changed = false;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, File, FormData, console,
    alert: (message) => messages.push(message),
    require: () => ({
      useAPIData: () => ({
        putData: async () => {
          calls.push("save");
          if (failSave) throw new Error("offline");
        },
        deleteFile: async (id, password) => {
          calls.push(["delete", id, password]);
          if (failDelete) throw new Error("delete failed");
        },
      }),
    }),
  });
  const form = exports.default({ url }, { title: "Draft", files: [] }, () => {
    changed = true;
  });
  return { form, calls, messages, wasChanged: () => changed };
}

(async () => {
  const event = { preventDefault() {} };
  const failed = makeForm({ failSave: true });
  await assert.rejects(failed.form.updateForm(event, "1", [2]));
  assert.deepEqual(failed.calls, ["save"]);

  const success = makeForm();
  await success.form.updateForm(event, "1", [2], "password");
  assert.deepEqual(success.calls, ["save", ["delete", "2", "password"]]);

  const partial = makeForm({ failDelete: true });
  await partial.form.updateForm(event, "1", [2]);
  assert.match(partial.messages[0], /내용은 저장/);

  for (const url of ["/notices", "/inquiries", "/photos"]) {
    const test = makeForm({ url });
    test.form.handleChange({
      target: { id: "file1", type: "file", value: "", files: [new File(["pdf"], "test.pdf", { type: "application/pdf" })] },
    });
    assert.equal(test.wasChanged(), url !== "/photos");
  }
  console.log("PASS: save failure preserves attachments; save precedes deletion; partial failure reported; PDF accepted only for general boards.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
