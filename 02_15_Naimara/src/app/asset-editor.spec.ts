import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetEditor } from './asset-editor';
import { By } from '@angular/platform-browser';

describe('AssetEditor', () => {
  let component: AssetEditor;
  let fixture: ComponentFixture<AssetEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetEditor]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default initialized form', () => {
    expect(component.assetForm.get('assetId')?.value).toBe('VID-001');
    expect(component.assetForm.get('name')?.value).toBe('Video Naimara (Local)');
    expect(component.assetForm.get('url')?.value).toContain('WIN_20260322_10_47_52_Pro.mp4');
  });

  it('should render a barcode SVG element', () => {
    const svgEl = fixture.debugElement.query(By.css('svg#barcode'));
    expect(svgEl).toBeTruthy();
  });

  it('should be able to remove a tag', () => {
    const initialCount = component.tags().length;
    component.removeTag('Marketing');
    expect(component.tags().length).toBe(initialCount - 1);
  });

  it('saveChanges should be callable without throwing', () => {
    expect(() => component.saveChanges()).not.toThrow();
  });
});
