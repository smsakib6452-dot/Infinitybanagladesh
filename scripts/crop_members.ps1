Add-Type -AssemblyName System.Drawing

function Crop-Image($sourcePath, $destPath, $x, $y, $w, $h) {
    $src = [System.Drawing.Bitmap]::FromFile($sourcePath)
    
    if ($x + $w -gt $src.Width) { $w = $src.Width - $x }
    if ($y + $h -gt $src.Height) { $h = $src.Height - $y }
    if ($x -lt 0) { $x = 0 }
    if ($y -lt 0) { $y = 0 }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $destBmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($src, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $destBmp.Dispose()
    $src.Dispose()
}

$standingPath = "C:\Users\User\Downloads\infinity-bangladesh\public\reference\standing-committee-poster.png"
$execPath = "C:\Users\User\Downloads\infinity-bangladesh\public\reference\executive-committee-2026.png"
$outDir = "C:\Users\User\Downloads\infinity-bangladesh\public\images\members"

Write-Host "Cropping Standing Committee (9 members)..."
# 1. Chairman (Sakib Al Karim)
Crop-Image $standingPath "$outDir\sc-1-sakib-al-karim.png" 215 84 96 90

# 2. Tamimul Hasib Rimad - Vice-Chairman
Crop-Image $standingPath "$outDir\sc-2-tamimul-hasib-rimad.png" 118 190 85 82

# 3. Shifat Sattar - Vice-Chairman
Crop-Image $standingPath "$outDir\sc-3-shifat-sattar.png" 323 190 85 82

# 4. Ishtiaqe Ahmed - Member
Crop-Image $standingPath "$outDir\sc-4-ishtiaqe-ahmed.png" 62 290 74 74

# 5. Chaity Debi Piya - Member
Crop-Image $standingPath "$outDir\sc-5-chaity-debi-piya.png" 226 290 74 74

# 6. Rakib Ahmed - Member
Crop-Image $standingPath "$outDir\sc-6-rakib-ahmed.png" 390 290 74 74

# 7. Md Ashraful Islam - Member
Crop-Image $standingPath "$outDir\sc-7-md-ashraful-islam.png" 62 402 74 74

# 8. Tanveer Haidar Rakib - Member
Crop-Image $standingPath "$outDir\sc-8-tanveer-haidar-rakib.png" 226 402 74 74

# 9. Md Arshad - Member
Crop-Image $standingPath "$outDir\sc-9-md-arshad.png" 390 402 74 74

Write-Host "Cropping Executive Committee (27 members)..."
# Row 1: President
Crop-Image $execPath "$outDir\exec-1-md-shahidul-alam-sakib.png" 215 115 82 90

# Row 2 (Tier 2 Leaders)
Crop-Image $execPath "$outDir\exec-2-mohammad-ismail.png" 32 195 75 82
Crop-Image $execPath "$outDir\exec-3-joinul-abedin.png" 152 195 75 82
Crop-Image $execPath "$outDir\exec-4-sohel-akram-sobuj.png" 280 195 75 82
Crop-Image $execPath "$outDir\exec-5-salimur-rahman-opi.png" 402 195 75 82

# Row 3 (5 Joint General Secretaries)
Crop-Image $execPath "$outDir\exec-6-tanveer-islam.png" 18 282 68 70
Crop-Image $execPath "$outDir\exec-7-saif-ahmed.png" 120 282 68 70
Crop-Image $execPath "$outDir\exec-8-md-monzurul-islam.png" 222 282 68 70
Crop-Image $execPath "$outDir\exec-9-sharif-uddin.png" 324 282 68 70
Crop-Image $execPath "$outDir\exec-10-md-sojib-miah.png" 424 282 68 70

# Row 4 (6 Secretaries)
Crop-Image $execPath "$outDir\exec-11-md-foysal-ahmed.png" 12 360 60 66
Crop-Image $execPath "$outDir\exec-12-md-jahidul-islam.png" 96 360 60 66
Crop-Image $execPath "$outDir\exec-13-md-mehedi-hasan.png" 180 360 60 66
Crop-Image $execPath "$outDir\exec-14-saiful-islam.png" 264 360 60 66
Crop-Image $execPath "$outDir\exec-15-md-al-amin.png" 348 360 60 66
Crop-Image $execPath "$outDir\exec-16-md-shakil-ahmed.png" 432 360 60 66

# Row 5 (6 Secretaries)
Crop-Image $execPath "$outDir\exec-17-sumaiya-akter.png" 12 436 60 66
Crop-Image $execPath "$outDir\exec-18-fatema-tuz-zohra.png" 96 436 60 66
Crop-Image $execPath "$outDir\exec-19-nusrat-jahan.png" 180 436 60 66
Crop-Image $execPath "$outDir\exec-20-md-nazmul-huq.png" 264 436 60 66
Crop-Image $execPath "$outDir\exec-21-md-rifat-hossain.png" 348 436 60 66
Crop-Image $execPath "$outDir\exec-22-md-maruf-hossain.png" 432 436 60 66

# Row 6 (5 Secretaries)
Crop-Image $execPath "$outDir\exec-23-md-rashedul-islam.png" 18 512 68 70
Crop-Image $execPath "$outDir\exec-24-joy-nath.png" 120 512 68 70
Crop-Image $execPath "$outDir\exec-25-rakibul-karim.png" 222 512 68 70
Crop-Image $execPath "$outDir\exec-26-tanjit-hossen.png" 324 512 68 70
Crop-Image $execPath "$outDir\exec-27-azizur-rahman.png" 424 512 68 70

# Clean debug directory if exists
if (Test-Path "$outDir\debug_exec") {
    Remove-Item -Recurse -Force "$outDir\debug_exec"
}

Write-Host "All 36 member portraits successfully cropped and saved to $outDir!"
