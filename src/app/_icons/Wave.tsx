import React from "react";
import { IconProps } from "../_types/icon";

export default function Wave({ alt, ...props }: IconProps) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      aria-label={alt}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={props.color}
        stroke="none"
      >
        <path
          d="M0 4071 l0 -151 38 0 c65 0 175 -29 237 -61 33 -17 106 -62 161 -100
   231 -156 396 -207 634 -196 205 10 324 53 540 197 69 45 148 94 177 107 151
   70 368 70 518 -1 39 -18 126 -70 195 -116 227 -151 334 -185 580 -184 238 1
   346 37 580 194 68 46 147 93 176 107 154 70 369 70 519 -1 39 -18 122 -68 185
   -111 188 -128 317 -178 497 -192 l83 -6 0 152 0 151 -37 0 c-66 0 -176 29
   -238 61 -33 17 -106 62 -161 100 -231 156 -396 207 -634 196 -205 -10 -324
   -53 -540 -197 -69 -45 -148 -94 -177 -107 -109 -51 -273 -66 -404 -39 -84 18
   -157 55 -311 158 -225 149 -333 183 -578 182 -238 -1 -346 -37 -580 -194 -68
   -46 -147 -93 -176 -107 -154 -70 -369 -70 -520 1 -39 19 -123 69 -185 112
   -187 127 -316 177 -496 191 l-83 6 0 -152z"
        />
        <path
          d="M0 3180 l0 -150 58 0 c118 0 195 -33 407 -173 222 -146 348 -183 599
   -174 96 3 173 11 211 22 95 26 211 85 340 172 200 134 255 153 432 153 177 0
   246 -26 466 -173 213 -143 351 -183 601 -174 225 8 317 40 532 184 209 140
   271 163 449 163 173 0 242 -24 430 -150 55 -37 125 -81 156 -99 110 -62 257
   -101 382 -101 l57 0 0 150 0 150 -50 0 c-122 0 -207 35 -415 173 -222 146
   -348 183 -599 174 -224 -7 -325 -42 -541 -187 -207 -139 -266 -160 -442 -160
   -174 0 -247 26 -450 164 -135 91 -182 115 -293 152 -81 26 -94 28 -275 28
   -155 1 -202 -2 -255 -17 -101 -29 -204 -81 -330 -166 -201 -136 -269 -161
   -447 -161 -175 0 -239 23 -443 160 -64 43 -138 89 -165 102 -110 55 -242 88
   -357 88 l-58 0 0 -150z"
        />
        <path
          d="M0 2301 l0 -151 38 0 c60 0 172 -28 230 -56 30 -15 103 -60 163 -100
   237 -162 400 -213 639 -201 207 11 328 55 540 197 68 46 147 93 176 107 158
   72 389 69 536 -7 32 -17 116 -69 187 -115 218 -144 336 -181 576 -179 234 2
   339 37 575 194 196 130 279 160 445 160 155 0 239 -33 459 -179 78 -52 168
   -102 214 -120 80 -30 232 -61 305 -61 l37 0 0 149 0 148 -70 7 c-137 14 -162
   25 -381 168 -229 148 -342 184 -584 182 -120 -1 -166 -5 -230 -23 -108 -29
   -218 -83 -350 -173 -60 -41 -135 -86 -165 -101 -151 -74 -373 -75 -525 -3 -38
   18 -132 74 -209 124 -221 146 -368 189 -601 179 -210 -10 -330 -53 -545 -197
   -68 -46 -147 -93 -176 -107 -154 -70 -364 -70 -519 1 -38 18 -122 68 -185 111
   -188 128 -317 178 -497 192 l-83 6 0 -152z"
        />
        <path
          d="M2 1415 l3 -150 70 -6 c131 -11 179 -32 374 -162 129 -86 217 -130
   318 -159 68 -20 101 -23 258 -23 143 0 194 4 245 19 100 27 215 85 346 173
   143 97 181 116 264 138 77 20 251 22 325 4 71 -16 172 -69 297 -155 201 -136
   308 -173 523 -181 265 -10 384 26 625 187 205 137 270 161 445 161 175 0 235
   -22 448 -162 67 -45 143 -92 169 -105 78 -39 216 -75 316 -81 l92 -6 0 152 0
   151 -53 0 c-118 0 -205 37 -421 179 -206 135 -328 173 -556 172 -230 0 -347
   -40 -589 -200 -197 -130 -257 -151 -434 -151 -168 0 -235 25 -440 162 -230
   153 -344 190 -587 189 -229 0 -358 -44 -582 -197 -189 -129 -259 -154 -437
   -154 -171 0 -239 25 -445 163 -194 130 -306 173 -484 186 l-92 7 2 -151z"
        />
      </g>
    </svg>
  );
}
