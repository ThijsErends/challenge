// Sinterklaas SVG image for the jigsaw puzzle
// Flat, construction-paper style matching the "Cardboard Arcade" aesthetic

function SinterklaasImage({ className, style }) {
  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sinterklaas illustratie"
    >
      {/* Background - teal */}
      <rect width="300" height="360" fill="#2AB7CA" />

      {/* Decorative stars */}
      <polygon points="50,30 53,40 63,40 55,47 58,57 50,51 42,57 45,47 37,40 47,40" fill="#F7931E" />
      <polygon points="250,50 252,57 260,57 254,62 256,69 250,65 244,69 246,62 240,57 248,57" fill="#F7931E" />
      <polygon points="30,120 32,127 40,127 34,132 36,139 30,135 24,139 26,132 20,127 28,127" fill="#F7931E" />
      <polygon points="270,150 272,157 280,157 274,162 276,169 270,165 264,169 266,162 260,157 268,157" fill="#F7931E" />
      <polygon points="40,280 42,287 50,287 44,292 46,299 40,295 34,299 36,292 30,287 38,287" fill="#F7931E" />

      {/* Pepernoten scattered */}
      <ellipse cx="260" cy="320" rx="12" ry="10" fill="#8B4513" />
      <ellipse cx="240" cy="340" rx="10" ry="8" fill="#8B4513" />
      <ellipse cx="275" cy="345" rx="11" ry="9" fill="#8B4513" />
      <ellipse cx="25" cy="200" rx="10" ry="8" fill="#8B4513" />
      <ellipse cx="45" cy="220" rx="9" ry="7" fill="#8B4513" />

      {/* Gift bag - green */}
      <path
        d="M 200 200
           Q 180 210 175 280
           L 175 340
           Q 175 355 190 355
           L 250 355
           Q 265 355 265 340
           L 265 260
           Q 260 200 230 195
           Q 210 190 200 200 Z"
        fill="#439F47"
      />
      {/* Bag tie */}
      <ellipse cx="215" cy="205" rx="25" ry="10" fill="#2d6b30" />
      {/* Gifts peeking out */}
      <rect x="190" y="180" width="20" height="25" fill="#C94343" />
      <rect x="215" y="175" width="18" height="30" fill="#F7931E" />
      <rect x="195" y="185" width="20" height="5" fill="#F4F1E8" />
      <rect x="203" y="180" width="5" height="25" fill="#F4F1E8" />

      {/* Staff */}
      <rect x="60" y="100" width="12" height="220" fill="#F7931E" rx="3" />
      {/* Staff curl/crook */}
      <path
        d="M 66 100
           Q 66 60 100 60
           Q 130 60 130 90
           Q 130 110 115 110
           Q 100 110 100 95
           Q 100 80 110 80"
        fill="none"
        stroke="#F7931E"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Sinterklaas body/robe - red */}
      <path
        d="M 90 170
           Q 85 200 85 280
           L 85 355
           L 175 355
           L 175 280
           Q 175 200 165 170
           Q 150 150 127 150
           Q 100 150 90 170 Z"
        fill="#C94343"
      />

      {/* White robe trim at bottom */}
      <rect x="85" y="340" width="90" height="15" fill="#F4F1E8" />

      {/* Hands */}
      <ellipse cx="85" cy="240" rx="15" ry="12" fill="#FFDAB9" />
      <ellipse cx="175" cy="250" rx="15" ry="12" fill="#FFDAB9" />

      {/* Cape/cloak overlay */}
      <path
        d="M 95 170
           Q 90 180 90 200
           L 95 280
           Q 127 260 160 280
           L 165 200
           Q 165 180 160 170
           Q 127 160 95 170 Z"
        fill="#a33636"
      />

      {/* White collar/stole */}
      <path
        d="M 100 155
           Q 127 145 155 155
           L 155 180
           Q 127 170 100 180
           Z"
        fill="#F4F1E8"
      />

      {/* Face */}
      <ellipse cx="127" cy="110" rx="35" ry="40" fill="#FFDAB9" />

      {/* Beard - large and white */}
      <path
        d="M 92 115
           Q 85 120 85 140
           Q 85 180 100 200
           Q 115 215 127 220
           Q 140 215 155 200
           Q 170 180 170 140
           Q 170 120 163 115
           Q 145 125 127 125
           Q 110 125 92 115 Z"
        fill="#F4F1E8"
      />

      {/* Mustache */}
      <path
        d="M 105 115
           Q 115 125 127 120
           Q 140 125 150 115
           Q 145 130 127 130
           Q 110 130 105 115 Z"
        fill="#E8E4DB"
      />

      {/* Eyes */}
      <ellipse cx="115" cy="100" rx="5" ry="6" fill="#1A1713" />
      <ellipse cx="140" cy="100" rx="5" ry="6" fill="#1A1713" />
      {/* Eye highlights */}
      <circle cx="117" cy="98" r="2" fill="#F4F1E8" />
      <circle cx="142" cy="98" r="2" fill="#F4F1E8" />

      {/* Eyebrows */}
      <path d="M 108 90 Q 115 87 122 90" stroke="#F4F1E8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 133 90 Q 140 87 147 90" stroke="#F4F1E8" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="127" cy="110" rx="6" ry="5" fill="#E8C4A0" />

      {/* Rosy cheeks */}
      <ellipse cx="100" cy="115" rx="8" ry="5" fill="#E8A0A0" opacity="0.5" />
      <ellipse cx="155" cy="115" rx="8" ry="5" fill="#E8A0A0" opacity="0.5" />

      {/* Mitre (bishop's hat) */}
      <path
        d="M 85 75
           L 95 20
           Q 127 5 160 20
           L 170 75
           Q 127 85 85 75 Z"
        fill="#F4F1E8"
      />
      {/* Mitre band */}
      <path
        d="M 85 75
           Q 127 85 170 75
           L 170 65
           Q 127 75 85 65
           Z"
        fill="#F7931E"
      />
      {/* Mitre cross */}
      <rect x="122" y="25" width="10" height="35" fill="#C94343" />
      <rect x="110" y="35" width="35" height="10" fill="#C94343" />

      {/* Book in hand (Grote Boek) */}
      <rect x="155" y="230" width="35" height="45" fill="#8B0000" rx="2" />
      <rect x="158" y="233" width="29" height="39" fill="#C94343" rx="1" />
      {/* Book spine */}
      <rect x="155" y="230" width="5" height="45" fill="#5c0000" />
      {/* Book pages */}
      <rect x="161" y="235" width="23" height="2" fill="#F4F1E8" />
      <rect x="161" y="240" width="23" height="2" fill="#F4F1E8" />
      <rect x="161" y="245" width="23" height="2" fill="#F4F1E8" />
      <rect x="161" y="250" width="23" height="2" fill="#F4F1E8" />
    </svg>
  )
}

export default SinterklaasImage
