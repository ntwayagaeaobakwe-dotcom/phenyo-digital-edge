$brandBlue = "#2b7fff"
$textPrimary = "#f4f6fb"

function Create-FaviconSvg([int]$size) {
    $fontSize = [Math]::Round($size * 0.28)
    $radius = $size / 2
    return @"
<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 $size $size">
  <rect width="$size" height="$size" rx="$radius" fill="$brandBlue"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="$textPrimary" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="${fontSize}px" letter-spacing="-0.03em">NYG</text>
</svg>
"@
}

# 1. Write favicon.svg
$faviconSvg = Create-FaviconSvg 64
$faviconSvg | Out-File -Encoding utf8 "public\favicon.svg"

# 2. Render Icon PNGs using sharp-cli
$icons = @(
    @{ Name = "favicon.ico"; Size = 48 },
    @{ Name = "icon-192.png"; Size = 192 },
    @{ Name = "icon-512.png"; Size = 512 },
    @{ Name = "apple-touch-icon.png"; Size = 180 }
)

foreach ($icon in $icons) {
    $svgPath = "temp_$($icon.Size).svg"
    (Create-FaviconSvg $icon.Size) | Out-File -Encoding utf8 $svgPath
    npx -y sharp-cli -i $svgPath -o "public\$($icon.Name)"
    Remove-Item $svgPath -ErrorAction SilentlyContinue
}

# 3. Composite Open Graph Image (1200x630)
$ogSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="vignette" cx="30%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#141c2c" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#090b10" stop-opacity="0.98"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#vignette)"/>

  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)" />

  <g transform="translate(80, 80)">
    <circle cx="28" cy="28" r="28" fill="$brandBlue"/>
    <text x="28" y="31" dominant-baseline="middle" text-anchor="middle" fill="$textPrimary" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="16px" letter-spacing="-0.02em">NYG</text>
    <text x="72" y="29" dominant-baseline="middle" fill="rgba(244,246,251,0.6)" font-family="'JetBrains Mono', monospace" font-size="14px" letter-spacing="0.15em">NYG DIGITAL</text>
  </g>

  <text x="80" y="240" fill="$textPrimary" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">We build the systems that run</text>
  <text x="80" y="300" fill="rgba(244,246,251,0.65)" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">growing operations — quietly,</text>
  <text x="80" y="360" fill="rgba(244,246,251,0.65)" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">and without another hire.</text>

  <text x="80" y="440" fill="rgba(244,246,251,0.5)" font-family="'Inter', sans-serif" font-weight="500" font-size="20px">Business automation &amp; web systems for Dubai real estate &amp; facility operators.</text>

  <g transform="translate(80, 530)">
    <rect width="200" height="34" rx="17" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="100" y="18" dominant-baseline="middle" text-anchor="middle" fill="$brandBlue" font-family="'JetBrains Mono', monospace" font-size="12px" font-weight="600">DUBAI, UAE (UTC+4)</text>
  </g>
</svg>
"@

$ogSvg | Out-File -Encoding utf8 "temp_og.svg"
npx -y sharp-cli -i "temp_og.svg" -o "public\og.png"
npx -y sharp-cli -i "temp_og.svg" -o "public\og-image.jpg" --quality 85
Remove-Item "temp_og.svg" -ErrorAction SilentlyContinue

Write-Host "Favicons and OG images composited successfully."
