$brainDir = "C:\Users\CJ\.gemini\antigravity-ide\brain\f3994871-38df-40ec-94d4-09332e69697c"

New-Item -ItemType Directory -Force -Path "public\work" | Out-Null
New-Item -ItemType Directory -Force -Path "public\textures" | Out-Null

Write-Host "Converting Hero Poster..."
npx -y sharp-cli -i "$brainDir\hero_poster_1785694257295.png" -o "public\hero-poster.avif" resize 1280 720 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\hero_poster_1785694257295.png" -o "public\hero-poster.webp" resize 1280 720 -- -m --quality 78

Write-Host "Converting Approach Image 1..."
npx -y sharp-cli -i "$brainDir\about_1_1785694269203.png" -o "public\about-1.avif" resize 876 692 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\about_1_1785694269203.png" -o "public\about-1.webp" resize 876 692 -- -m --quality 78

Write-Host "Converting Approach Image 2..."
npx -y sharp-cli -i "$brainDir\about_2_1785694282166.png" -o "public\about-2.avif" resize 1200 800 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\about_2_1785694282166.png" -o "public\about-2.webp" resize 1200 800 -- -m --quality 78

Write-Host "Converting Case Study 1 Poster..."
npx -y sharp-cli -i "$brainDir\lead_response_poster_1785694294026.png" -o "public\work\lead-response-poster.avif" resize 960 718 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\lead_response_poster_1785694294026.png" -o "public\work\lead-response-poster.webp" resize 960 718 -- -m --quality 78

Write-Host "Converting Case Study 2 Poster..."
npx -y sharp-cli -i "$brainDir\ops_dispatch_poster_1785694306320.png" -o "public\work\ops-dispatch-poster.avif" resize 720 720 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\ops_dispatch_poster_1785694306320.png" -o "public\work\ops-dispatch-poster.webp" resize 720 720 -- -m --quality 78

Write-Host "Converting Flow Noise Shader Texture..."
npx -y sharp-cli -i "$brainDir\flow_noise_texture_1785694317267.png" -o "public\textures\flow-noise.avif" resize 1024 1024 -- -m --quality 55
npx -y sharp-cli -i "$brainDir\flow_noise_texture_1785694317267.png" -o "public\textures\flow-noise.png" resize 1024 1024 -- -m

Write-Host "All conversions finished successfully."
