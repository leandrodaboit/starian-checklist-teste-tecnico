import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ButtonComponent } from './button.component';

describe('ButtonComponent (Unitário)', () => {
  it('emite "buttonClick" ao ser clicado', async () => {
    const user = userEvent.setup();
    const mockClickHandler = jest.fn();

    await render(ButtonComponent, {
      componentOutputs: {
        buttonClick: {
          emit: mockClickHandler
        } as any,
      }
    });
    const buttonElement = screen.getByRole('button');

    await user.click(buttonElement);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
