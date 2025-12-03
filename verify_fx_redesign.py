from playwright.sync_api import sync_playwright

def verify_fx_panel():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")

            # Wait for the FX panel buttons to appear
            # We expect buttons "CHO", "DLY", "REV"
            page.wait_for_selector("text=CHO")
            page.wait_for_selector("text=DLY")
            page.wait_for_selector("text=REV")

            # Check default selection (Chorus)
            # The screen should show "FX: CHORUS"
            page.wait_for_selector("text=FX: CHORUS")

            # Click Delay
            page.click("text=DLY")
            # Screen should show "FX: DELAY"
            page.wait_for_selector("text=FX: DELAY")

            # Take screenshot of the delay panel
            page.screenshot(path="verification_fx_delay.png")
            print("Screenshot taken: verification_fx_delay.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_fx_panel()
