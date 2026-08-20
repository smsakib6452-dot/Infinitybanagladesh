Add-Type -AssemblyName System.Drawing

function Crop-Portrait($sourcePath, $destPath, $x, $y, $w, $h) {
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
Crop-Portrait $standingPath "$outDir\sc-1-sakib-al-karim.png" 215 84 96 84
Crop-Portrait $standingPath "$outDir\sc-2-tamimul-hasib-rimad.png" 118 190 85 76
Crop-Portrait $standingPath "$outDir\sc-3-shifat-sattar.png" 323 190 85 76
Crop-Portrait $standingPath "$outDir\sc-4-ishtiaqe-ahmed.png" 62 290 74 68
Crop-Portrait $standingPath "$outDir\sc-5-chaity-debi-piya.png" 226 290 74 68
Crop-Portrait $standingPath "$outDir\sc-6-rakib-ahmed.png" 390 290 74 68
Crop-Portrait $standingPath "$outDir\sc-7-md-ashraful-islam.png" 62 402 74 68
Crop-Portrait $standingPath "$outDir\sc-8-tanveer-haidar-rakib.png" 226 402 74 68
Crop-Portrait $standingPath "$outDir\sc-9-md-arshad.png" 390 402 74 68

Write-Host "Cropping Executive Committee (27 members)..."
# Row 1 (President & VPs)
Crop-Portrait $execPath "$outDir\exec-1-md-shahidul-alam-sakib.png" 48 94 66 66
Crop-Portrait $execPath "$outDir\exec-2-mohammad-ismail.png" 176 106 56 56
Crop-Portrait $execPath "$outDir\exec-3-joinul-abedin.png" 296 106 56 56
Crop-Portrait $execPath "$outDir\exec-4-sohel-akram-sobuj.png" 416 106 56 56

# Row 2 (General Secretary & Joint General Secretaries)
Crop-Portrait $execPath "$outDir\exec-5-salimur-rahman-opi.png" 54 202 64 64
Crop-Portrait $execPath "$outDir\exec-6-anayet-ullah-farhad.png" 152 216 52 52
Crop-Portrait $execPath "$outDir\exec-7-md-niaj-udden-sakib.png" 228 216 52 52
Crop-Portrait $execPath "$outDir\exec-8-reaz-uddin.png" 304 216 52 52
Crop-Portrait $execPath "$outDir\exec-9-shahadat-islam.png" 380 216 52 52
Crop-Portrait $execPath "$outDir\exec-10-kaisar-ahmed-irfan.png" 456 216 52 52

# Row 3 (Organizing & Finance)
Crop-Portrait $execPath "$outDir\exec-11-md-ismail-nur-sakib.png" 26 322 50 50
Crop-Portrait $execPath "$outDir\exec-12-md-arfat.png" 108 322 50 50
Crop-Portrait $execPath "$outDir\exec-13-kaisar-ahmed-ovi.png" 190 322 50 50
Crop-Portrait $execPath "$outDir\exec-14-munmun-banik.png" 272 322 50 50
Crop-Portrait $execPath "$outDir\exec-15-md-shahadad-alam.png" 354 322 50 50
Crop-Portrait $execPath "$outDir\exec-16-md-mehedi-hasan.png" 436 322 50 50

# Row 4 (Student Affairs & Publicity)
Crop-Portrait $execPath "$outDir\exec-17-sumaya-imroz.png" 26 424 50 50
Crop-Portrait $execPath "$outDir\exec-18-shanzida-sharmin.png" 108 424 50 50
Crop-Portrait $execPath "$outDir\exec-19-dipa-shil.png" 190 424 50 50
Crop-Portrait $execPath "$outDir\exec-20-refat-sharif.png" 272 424 50 50
Crop-Portrait $execPath "$outDir\exec-21-md-ramjan.png" 354 424 50 50
Crop-Portrait $execPath "$outDir\exec-22-susmita-rani-nath.png" 436 424 50 50

# Row 5 (Departmental Secretaries)
Crop-Portrait $execPath "$outDir\exec-23-tanvir-rana-riyad.png" 24 512 52 52
Crop-Portrait $execPath "$outDir\exec-24-joy-nath.png" 120 512 52 52
Crop-Portrait $execPath "$outDir\exec-25-rakibul-karim.png" 216 512 52 52
Crop-Portrait $execPath "$outDir\exec-26-tanjit-hossen.png" 312 512 52 52
Crop-Portrait $execPath "$outDir\exec-27-azizur-rahman.png" 408 512 52 52

Write-Host "All 36 portraits successfully generated."
