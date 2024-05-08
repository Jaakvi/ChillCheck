*** Settings ***
Library     Browser    auto_closing_level=Suite
Library     CryptoLibrary    variable_decryption=True
*** Variables ***
${username}    crypt:ryTnQQpJF/K1TgIua0I7QDMosGsr7ei4VFju4COSCGDO1D2Q6dcoV8tbBPkpZGidlZfnCVT+P/cTnssFYmjFaNoRxCHSoWvy/yN48bk=
${password}    crypt:vwg18Y+qzJaa3LyGapS7TssPdmeRqOzQo+x42JYyOX8RNur+9GU97x+99PG0LfcJ5biCCvI9zyq5MOEl
${token}
*** Test Cases ***
Login function 
    New Browser    chromium    headless=No  
    New Page       https://hyte-server-aura.northeurope.cloudapp.azure.com/kirjautuminen.html 
    Type Text      [name="username"]        ${Username}    
    Type Text    [name="password"]    ${Password}    
    Click With Options  [id="login_button"]  
    LocalStorage Set Item    key=token  value=token
    



Get results  
    New Page     https://hyte-server-aura.northeurope.cloudapp.azure.com/kotisivu.html
    Click With Options    [id="get_result"]   delay= 1.0 s
    LocalStorage Get Item    key='token'
    ${token} =    LocalStorage Get Item    Key
    Log To Console  ${token}

Get earlier results
    New Page    https://hyte-server-aura.northeurope.cloudapp.azure.com/historia.html
    Click With Options    [class="get_users"]
    Wait For Response   matcher=https://hyte-server-aura.northeurope.cloudapp.azure.com/api/kubios/user-data   
    Log  message=["class=get_users"]
    