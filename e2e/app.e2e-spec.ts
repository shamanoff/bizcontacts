import { BizcontactsPage } from './app.po';

describe('bizcontacts App', () => {
  let page: BizcontactsPage;

  beforeEach(() => {
    page = new BizcontactsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
