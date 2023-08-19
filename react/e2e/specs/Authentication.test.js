export function test() {
    describe('Authentication Screen', () => {
        it('Signin Button Text', async () => {
            const text = await $('~Signin-Button-Text');
            await expect(text).toHaveText('Sign In with Google');
        });

        it('Login : valid case', async () => {
            await $('~Signin-Button').click();
            await $('~Nutt Chairatana nuttc@cmkl.ac.th').click();
            const dashboardScreen = await $('~Dashboard-Screen');
            dashboardScreen.waitForDisplayed(5000);
            await expect(dashboardScreen).toBeExisting();
        });
    });
}
