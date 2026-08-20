Add-Type -AssemblyName System.Drawing

function Get-Dims {
    param($path)
    $img = [System.Drawing.Bitmap]::FromFile($path)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    return [PSCustomObject]@{ Width = $w; Height = $h }
}

$s = Get-Dims "$PSScriptRoot\..\public\reference\standing-committee-poster.png"
$e = Get-Dims "$PSScriptRoot\..\public\reference\executive-committee-2026.png"

Write-Host "Standing: $($s.Width) x $($s.Height)"
Write-Host "Exec: $($e.Width) x $($e.Height)"
