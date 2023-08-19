export function test() {
    describe('Competency Screen', () => {
        it('Competency : Pillar screen', async () => {
            await $('~Competency-Tab').waitForDisplayed(5000);
            await $('~Competency-Tab').click();
            const competencyScreen = await $('~Competency-Screen');
            await expect(competencyScreen).toBeExisting();
        });
        it('Competency : Pillar & Subdomain component', async () => {
            await $('~Competency-Pillar-Button').click();
            const subdomainButton = await $('~Competency-Subdomain-Button');
            await expect(subdomainButton).toBeExisting();
        });
        it('Competency : Student card screen', async () => {
            await $('~Competency-Subdomain-Button').click();
            const studentCard = await $('~Competency-Student-Screen');
            await expect(studentCard).toBeExisting();
        });
    });
}
