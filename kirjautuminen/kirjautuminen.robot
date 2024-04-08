*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    avainsanat.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/public/etusivu.html
    Click          id=login    left
    Type Text      [class="login__input username--input"]        ${Username}    delay=0.1 s 
    Type Text    [class="login__input password--input"]    ${Password}      delay=0.1 s
    Click With Options    [id="login_button"]    delay=2 s