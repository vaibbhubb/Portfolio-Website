# refresh-data.ps1
# Fetches fresh analytics data from GoatCounter and updates data.js / data.json.
# Usage: powershell -ExecutionPolicy Bypass -File analytics/refresh-data.ps1
#
# Requires: GoatCounter API key set in $env:GOATCOUNTER_API_KEY
# or it will use the default key below.

param(
    [string]$ApiKey = $env:GOATCOUNTER_API_KEY,
    [string]$SiteCode = "vaibbhubb",
    [string]$StartDate = "2026-08-27"
)

if (-not $ApiKey) {
    Write-Error "API key not found. Set `$env:GOATCOUNTER_API_KEY before running this script."
    exit 1
}

$endDate = (Get-Date).ToString("yyyy-MM-dd")
$baseUrl = "https://$SiteCode.goatcounter.com"
$apiUrl = "$baseUrl/api/v0/stats/hits?start=$StartDate&end=$endDate&limit=100"

Write-Host "Fetching data from GoatCounter..." -ForegroundColor Cyan
Write-Host "  URL: $apiUrl"
Write-Host "  Date range: $StartDate -> $endDate"

try {
    $headers = @{
        "Authorization" = "Bearer $ApiKey"
        "Content-Type"  = "application/json"
    }

    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    $json = $response | ConvertTo-Json -Depth 10 -Compress

    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    
    # Save data.json
    $jsonPath = Join-Path $scriptDir "data.json"
    $json | Out-File -FilePath $jsonPath -Encoding UTF8 -NoNewline
    Write-Host "  Saved: $jsonPath" -ForegroundColor Green

    # Save data.js
    $jsPath = Join-Path $scriptDir "data.js"
    $jsContent = "window.GOATCOUNTER_DATA = $json;`n"
    $jsContent | Out-File -FilePath $jsPath -Encoding UTF8 -NoNewline
    Write-Host "  Saved: $jsPath" -ForegroundColor Green

    # Summary
    $totalHits = $response.total
    $pageCount = $response.hits.Count
    Write-Host "`nDone! $totalHits total views across $pageCount pages." -ForegroundColor Green
}
catch {
    Write-Host "Error fetching data: $_" -ForegroundColor Red
    exit 1
}
