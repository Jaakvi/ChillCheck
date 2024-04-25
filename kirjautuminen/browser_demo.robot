*** Settings ***
Library     Browser    auto_closing_level=SUITE
Resource    Keyword.robot 
Library     CryptoLibrary         variable_decryption=True

*** Variables ***
${username}    crypt:RqMrvQuXBhZhUcm+j+edokuH89seqlbf2h22u747zEYxq9Tm5mzvpMrFpEO6BWH6MOsg7CwhwDB5rr2LcFzsvE4mR4KKeXLKL2vMjA==
${password}    crypt:gRndk729NLVS4zVhuzp8l5pFF1zDM+uI4OBQwIUnBxJY5lymQYDIyXbUn4rC0Fx3ejaegc0AjtoSSdDdPH+1FI1aRA==

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/kirjautuminen.html
    Get Title      ==  Kirjautuminen
    Type Text      [name="username"]        ${Username}    delay=0.1 s 
    Type Text    [name="password"]    ${Password}      delay=0.1 s
    Click With Options    [id="login_button"]    delay=2 s
    