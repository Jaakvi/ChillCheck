*** Settings ***
Library     Browser    auto_closing_level=SUITE
Library     CryptoLibrary    variable_decryption=True
Resource    crypt.resource
*** Variables ***
${Username}    crypt:iApKomcGX7IE1jmbhnO/6EzWRogeow+DbhDbCfY35UJozlL6dPZWzi1hGwuPs6t+yRMpA6zm0+M0BKX/fj+VOQ==
${Password}    crypt:6jeT1Kdww3XNxuv+4YIJWRsf6xT7ntgnSEkQJtcqAQXwq5+mRpAhhcC+5Bg9ZGRqM27rjnAJSknQUFQ3vWwv
${Message}     Hello, Robot Framework!\nHow are you today?

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No
    New Context    viewport={'width': 800, 'height': 600}
    New Page    https://www.selenium.dev/selenium/web/web-form.html 
    Get Title    ==    Web form  
    Type Text    [name="my-text"]    ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password    delay=0.1 s
    Type Text    [name="my-textarea"]    ${Message}    delay=0.1 s
    Click With Options    button    delay=2 s
    Get Text    id=message    ==    Received!
    Sleep    2.0 s