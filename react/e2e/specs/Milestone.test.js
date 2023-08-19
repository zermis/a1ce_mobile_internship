export function test() {
    describe('Milestone Screen', () => {
        it('Milestone : Valid screen', async () => {
            await $('~Milestone-Tab').waitForDisplayed(5000);
            await $('~Milestone-Tab').click();
            const milestoneScreen = await $('~Milestone-Screen');
            await expect(milestoneScreen).toBeExisting();
        });
    });
}
