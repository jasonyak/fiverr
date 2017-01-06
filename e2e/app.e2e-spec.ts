import { TonyWebAppV2Page } from './app.po';

describe('tony-web-app-v2 App', function() {
  let page: TonyWebAppV2Page;

  beforeEach(() => {
    page = new TonyWebAppV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
