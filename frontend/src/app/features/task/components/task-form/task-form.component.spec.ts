import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { TaskFormComponent } from './task-form.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

describe('TaskFormComponent (Integração)', () => {
  async function setupComponent() {
    const user = userEvent.setup();
    const mockAddTaskHandler = jest.fn();

    await render(TaskFormComponent, {
      imports: [FormsModule],
      declarations: [InputComponent, ButtonComponent],
      componentOutputs: {
        addTask: {
          emit: mockAddTaskHandler
        } as any
      }
    });
    return { user, mockAddTaskHandler };
  }

  it('Emitir o evento "addTask" com o título', async () => {
    const { user, mockAddTaskHandler } = await setupComponent();
    const titleInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add/i });
    const newTaskTitle = 'Nova Tarefa Pelo Teste';

    await user.type(titleInput, newTaskTitle);
    await user.click(submitButton);

    expect(mockAddTaskHandler).toHaveBeenCalledTimes(1);
    expect(mockAddTaskHandler).toHaveBeenCalledWith(newTaskTitle);
  });

  it('Limpa o input depois de adicionar a tarefa', async () => {
    const { user } = await setupComponent();
    const titleInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(titleInput, 'Tarefa para limpar');
    await user.click(submitButton);

    expect(titleInput).toHaveValue('');
  });

  it('Não deve emitir o evento se o título não for preenchido', async () => {
    const { user, mockAddTaskHandler } = await setupComponent();
    const titleInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add/i });

    expect(submitButton).toBeDisabled();
    await user.type(titleInput, '   ');
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    expect(mockAddTaskHandler).not.toHaveBeenCalled();
  });

  it('Controla o estado disabled do botão', async () => {
    const { user } = await setupComponent();
    const titleInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add/i });

    expect(submitButton).toBeDisabled();

    await user.type(titleInput, 'Algo');
    expect(submitButton).toBeEnabled();

    await user.clear(titleInput);
    expect(submitButton).toBeDisabled();
  });
});
