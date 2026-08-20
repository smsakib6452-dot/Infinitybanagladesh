Add-Type -AssemblyName System.Drawing

function Crop-Exact($srcBmp, $destPath, $x, $y, $w, $h) {
    if ($x + $w -gt $srcBmp.Width) { $w = $srcBmp.Width - $x }
    if ($y + $h -gt $srcBmp.Height) { $h = $srcBmp.Height - $y }
    if ($x -lt 0) { $x = 0 }
    if ($y -lt 0) { $y = 0 }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $destBmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($srcBmp, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $destBmp.Dispose()
}

$standingPath = "$PSScriptRoot\..\public\reference\standing-committee-poster.png"
$execPath = "$PSScriptRoot\..\public\reference\executive-committee-2026.png"
$outDir = "$PSScriptRoot\..\public\images\members"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$sBmp = [System.Drawing.Bitmap]::FromFile($standingPath)
$eBmp = [System.Drawing.Bitmap]::FromFile($execPath)

Write-Host "Cropping Standing Committee (9 members)..."
# Row 1: Chairman
Crop-Exact $sBmp "$outDir\sc-1-sakib-al-karim.png" 219 78 87 80
# Row 2: Vice-Chairmen
Crop-Exact $sBmp "$outDir\sc-2-tamimul-hasib-rimad.png" 132 185 87 80
Crop-Exact $sBmp "$outDir\sc-3-shifat-sattar.png" 307 185 87 80
# Row 3: Members
Crop-Exact $sBmp "$outDir\sc-4-ishtiaqe-ahmed.png" 62 290 87 80
Crop-Exact $sBmp "$outDir\sc-5-chaity-debi-piya.png" 219 290 87 80
Crop-Exact $sBmp "$outDir\sc-6-rakib-ahmed.png" 376 290 87 80
# Row 4: Members
Crop-Exact $sBmp "$outDir\sc-7-md-ashraful-islam.png" 62 398 87 80
Crop-Exact $sBmp "$outDir\sc-8-tanveer-haidar-rakib.png" 219 398 87 80
Crop-Exact $sBmp "$outDir\sc-9-md-arshad.png" 376 398 87 80

Write-Host "Cropping Executive Committee (27 members)..."
# Top Leadership
# President
Crop-Exact $eBmp "$outDir\exec-1-md-shahidul-alam-sakib.png" 34 104 84 66
# Senior VP & VPs
Crop-Exact $eBmp "$outDir\exec-2-mohammad-ismail.png" 180 124 60 66
Crop-Exact $eBmp "$outDir\exec-3-joinul-abedin.png" 300 124 60 66
Crop-Exact $eBmp "$outDir\exec-4-sohel-akram-sobuj.png" 420 124 60 66

# General Secretary
Crop-Exact $eBmp "$outDir\exec-5-salimur-rahman-opi.png" 34 200 84 66
# Joint General Secretaries
Crop-Exact $eBmp "$outDir\exec-6-anayet-ullah-farhad.png" 168 228 42 48
Crop-Exact $eBmp "$outDir\exec-7-md-niaj-udden-sakib.png" 248 228 42 48
Crop-Exact $eBmp "$outDir\exec-8-reaz-uddin.png" 318 228 42 48
Crop-Exact $eBmp "$outDir\exec-9-shahadat-islam.png" 382 228 42 48
Crop-Exact $eBmp "$outDir\exec-10-kaisar-ahmed-irfan.png" 450 228 42 48

# Organizing & Finance Secretaries
Crop-Exact $eBmp "$outDir\exec-11-md-ismail-nur-sakib.png" 24 320 46 54
Crop-Exact $eBmp "$outDir\exec-12-md-arfat.png" 112 304 54 64
Crop-Exact $eBmp "$outDir\exec-13-kaisar-ahmed-ovi.png" 194 320 46 54
Crop-Exact $eBmp "$outDir\exec-14-munmun-banik.png" 274 320 46 54
Crop-Exact $eBmp "$outDir\exec-15-md-shahadad-alam.png" 356 304 54 64
Crop-Exact $eBmp "$outDir\exec-16-md-mehedi-hasan.png" 450 320 46 54

# Student Affairs & Publicity Secretaries
Crop-Exact $eBmp "$outDir\exec-17-sumaya-imroz.png" 24 432 46 54
Crop-Exact $eBmp "$outDir\exec-18-shanzida-sharmin.png" 108 420 56 64
Crop-Exact $eBmp "$outDir\exec-19-dipa-shil.png" 194 432 46 54
Crop-Exact $eBmp "$outDir\exec-20-refat-sharif.png" 278 432 46 54
Crop-Exact $eBmp "$outDir\exec-21-md-ramjan.png" 356 420 54 64
Crop-Exact $eBmp "$outDir\exec-22-susmita-rani-nath.png" 450 432 46 54

# Departmental Secretaries
Crop-Exact $eBmp "$outDir\exec-23-tanvir-rana-riyad.png" 24 532 46 54
Crop-Exact $eBmp "$outDir\exec-24-joy-nath.png" 122 532 46 54
Crop-Exact $eBmp "$outDir\exec-25-rakibul-karim.png" 236 532 46 54
Crop-Exact $eBmp "$outDir\exec-26-tanjit-hossen.png" 350 532 46 54
Crop-Exact $eBmp "$outDir\exec-27-azizur-rahman.png" 450 532 46 54

$sBmp.Dispose()
$eBmp.Dispose()

Write-Host "All 36 portraits recropped with precision."
