import initTabPanel from '../../../src/scripts/components/tab-panel';

describe('Tab Panel', () => {
  let tabPanel, tab1, tab2, panel1, panel2;

  beforeEach(() => {
    tabPanel = document.createElement('div');
    tabPanel.className = 'tab-panel';
    tabPanel.innerHTML = `  
    <nav>
      <ul role="tablist">
        <li id="tab1" role="tab" aria-controls="panel1" aria-selected="true">First</li>
        <li id="tab2" role="tab" aria-controls="panel2" aria-selected="false">Second</li>
        <span></span>
      </ul>
    </nav>

    <div id="panel1" aria-labelledby="tab1" role="tabpanel">
      <div class="tab-panel-inner">
        <p>My First tab</p>
      </div>
    </div>

    <div id="panel2" aria-labelledby="tab2" role="tabpanel" class="hidden">
      <div class="tab-panel-inner">
        <p>My second tab</p>
      </div>
    </div>`;

    initTabPanel(tabPanel);

    tab1 = tabPanel.querySelector('#tab1');
    tab2 = tabPanel.querySelector('#tab2');
    panel1 = tabPanel.querySelector('#panel1');
    panel2 = tabPanel.querySelector('#panel2');
  });

  it('should display panel on click', () => {
    tab2.click();

    expect(panel2.className).toContain('hidden');
    expect(panel1.className).not.toContain('hidden');
  });

  it('should be navigated by keyboard', () => {

  });
});