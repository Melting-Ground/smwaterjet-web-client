import React from "react";
import { IconProps } from "@/_types/icon";

export default function Target({ alt, ...props }: IconProps) {
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
          d="M2490 5101 c-57 -30 -74 -62 -78 -147 l-4 -74 -39 0 c-67 0 -252 -29
   -376 -60 -195 -47 -386 -125 -571 -231 -554 -319 -968 -855 -1118 -1445 -33
   -133 -64 -321 -64 -394 l0 -40 -61 0 c-114 0 -174 -52 -174 -150 0 -98 60
   -150 174 -150 l61 0 0 -40 c0 -74 31 -264 65 -395 74 -289 200 -548 386 -796
   327 -435 783 -745 1284 -874 131 -34 321 -65 395 -65 l40 0 0 -61 c0 -114 52
   -174 150 -174 98 0 150 60 150 174 l0 61 40 0 c74 0 264 31 396 65 500 128
   955 438 1283 874 186 248 312 507 386 796 34 131 65 321 65 395 l0 40 58 0
   c34 0 74 8 99 19 81 37 107 146 53 221 -30 42 -75 60 -150 60 l-60 0 0 40 c0
   74 -31 264 -65 395 -103 400 -306 747 -619 1060 -248 248 -513 421 -835 544
   -163 63 -482 131 -611 131 l-40 0 0 58 c0 140 -111 222 -220 163z m-82 -843
   l-3 -322 -85 -14 c-175 -28 -390 -116 -549 -225 -98 -67 -282 -250 -349 -349
   -109 -160 -196 -372 -225 -553 l-13 -80 -322 -3 -322 -2 0 27 c0 16 9 82 20
   148 130 795 715 1434 1500 1640 82 22 263 53 313 54 l37 1 -2 -322z m477 302
   c428 -70 795 -259 1106 -569 178 -179 290 -337 400 -566 94 -196 164 -441 185
   -648 l7 -67 -324 2 -323 3 -13 75 c-31 187 -110 384 -221 549 -69 104 -239
   278 -342 350 -159 112 -383 205 -565 234 l-80 13 -3 322 -2 322 27 0 c16 0 82
   -9 148 -20z m-475 -1064 c0 -122 2 -136 23 -166 36 -54 68 -72 127 -72 56 0
   87 16 124 66 18 24 21 45 24 168 l4 140 46 -7 c190 -28 413 -147 566 -299 155
   -156 273 -378 301 -568 l7 -48 -132 0 c-149 0 -190 -13 -225 -73 -25 -42 -24
   -120 2 -155 46 -61 63 -67 215 -70 l140 -4 -7 -46 c-9 -66 -58 -209 -99 -289
   -102 -201 -278 -377 -479 -479 -80 -41 -223 -90 -289 -99 l-46 -7 -4 140 c-3
   152 -9 169 -71 216 -37 27 -117 27 -154 0 -62 -47 -68 -64 -71 -216 l-4 -140
   -46 7 c-190 28 -412 147 -568 301 -152 153 -271 376 -299 566 l-7 46 140 4
   c152 3 169 9 215 70 26 35 27 113 2 156 -34 57 -83 72 -229 72 l-128 0 7 48
   c18 118 97 310 173 417 158 224 395 383 657 444 90 21 85 28 85 -123z m-1213
   -1171 c29 -176 110 -378 221 -545 72 -109 251 -288 363 -362 167 -112 373
   -194 552 -221 l77 -11 0 -324 0 -325 -67 7 c-38 4 -122 18 -189 31 -735 148
   -1341 710 -1545 1434 -29 104 -69 319 -69 374 l0 27 322 -2 322 -3 13 -80z
   m3379 18 c-4 -38 -18 -123 -31 -191 -159 -786 -791 -1418 -1577 -1577 -68 -13
   -153 -27 -190 -31 l-68 -7 0 325 0 324 78 11 c427 64 828 367 1022 776 55 115
   96 245 113 360 l11 77 324 0 325 0 -7 -67z"
        />
        <path
          d="M2492 3009 c-65 -32 -82 -74 -82 -199 l0 -100 -100 0 c-127 0 -167
   -17 -200 -85 -35 -72 -17 -137 54 -189 23 -18 45 -22 137 -24 l109 -4 0 -100
   c0 -114 18 -160 73 -193 42 -25 120 -24 155 2 58 43 67 66 70 183 l4 108 108
   4 c117 3 140 12 183 70 26 35 27 113 2 155 -33 56 -79 73 -194 73 l-101 0 0
   97 c0 123 -20 172 -84 202 -54 26 -80 26 -134 0z"
        />
      </g>
    </svg>
  );
}
