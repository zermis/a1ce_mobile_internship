export function test() {
    describe('Calendar Screen', () => {
        it('Calendar : Valid screen', async () => {
            await $('~Calendar-Tab').waitForDisplayed(5000);
            await $('~Calendar-Tab').click();
            const calendarScreen = await $('~Calendar-Screen');
            await expect(calendarScreen).toBeExisting();
        });
    });
}
