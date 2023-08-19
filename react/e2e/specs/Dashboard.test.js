export function test() {
    describe('Dashboard Screen', () => {
        it('Dashboard : Valid screen', async () => {
            await $('~Dashboard-Tab').waitForDisplayed(5000);
            await $('~Dashboard-Tab').click();
            const dashboardScreen = await $('~Dashboard-Screen');
            await expect(dashboardScreen).toBeExisting();
        });
    });
}
