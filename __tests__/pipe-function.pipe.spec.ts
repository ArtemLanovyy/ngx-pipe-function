import 'jest-zone-patch';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeFunction } from '../src/lib/pipe-function.pipe';

@Component({
  selector: 'pfunc-component',
  template: `
  {{[name, surname] | pipeFunction : compile}}
  `,
})
export class DemoComponent {
  @Input() public name = 'Bob';
  @Input() public surname = 'Dylan';

  public compile([name, surname]: string[]): string {
    return btoa(`${name} ${surname}`);
  }
}

describe('PipeFunction', () => {
  let pipe: PipeFunction;

  beforeEach(() => {
    pipe = new PipeFunction();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('call provided function', () => {
    const TEST = 'test';
    const method = value => value;
    const spy = jest.fn(method);

    expect(pipe.transform(TEST, spy)).toBe(TEST);
    expect(spy).toHaveBeenCalled();
  });

  describe('DemoComponent function pipe memoization', () => {
    let fixture: ComponentFixture<DemoComponent>;
    let component: DemoComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DemoComponent, PipeFunction],
      }).compileComponents();

      fixture = TestBed.createComponent(DemoComponent);
      component = fixture.debugElement.componentInstance;
    });

    it('should return compiled output', () => {
      fixture.detectChanges();
      const output = btoa(`${component.name} ${component.surname}`);

      expect(fixture.debugElement.nativeElement.textContent).toContain(output);
    });

    it('should call provided function once', () => {
      const spy = spyOn(component, 'compile').and.callThrough();

      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should recall provided function only when arguments change', () => {
      const spy = spyOn(component, 'compile').and.callThrough();

      fixture.detectChanges();
      fixture.detectChanges();

      component.name = 'John';

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
