describe('Fluxo das Tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Exibir os elementos principais da tela inicial', () => {
    cy.contains('h1', 'Todo List').should('be.visible');

    cy.get('app-task-form').should('be.visible');
    cy.get('app-task-form input[placeholder="Enter a new task"]').should('be.visible');
    cy.get('app-task-form button').contains('Add').should('be.visible');

    cy.contains('h2', 'Tasks').should('be.visible');
    cy.get('app-task-list').should('be.visible');
  });

  it('Adicionar uma nova tarefa na lista', () => {
    const newTaskTitle = `Nova Tarefa ${Date.now()}`;

    cy.get('app-task-form input[placeholder="Enter a new task"]').type(newTaskTitle);
    cy.get('app-task-form button').contains('Add').click();

    cy.get('app-task-list')
      .contains('app-task-item', newTaskTitle)
      .within(() => {
        cy.get('span').should('contain', newTaskTitle);
        cy.get('input[type="checkbox"]').should('not.be.checked');
      });
  });

  it('Marcar uma tarefa como concluída', () => {
    const taskTitleToComplete = `Tarefa para Concluir ${Date.now()}`;

    cy.get('app-task-form input[placeholder="Enter a new task"]').type(taskTitleToComplete);
    cy.get('app-task-form button').contains('Add').click();

    cy.get('app-task-list')
      .contains('app-task-item', taskTitleToComplete)
      .within(() => {
        cy.get('input[type="checkbox"]').click();
        cy.get('input[type="checkbox"]').should('be.checked');
        cy.get('span').should('have.class', 'completed');
      });
  });

  it('Remover uma tarefa da lista', () => {
    const taskTitleToRemove = `Tarefa para Remover ${Date.now()}`;

    cy.get('app-task-form input[placeholder="Enter a new task"]').type(taskTitleToRemove);
    cy.get('app-task-form button').contains('Add').click();

    cy.get('app-task-list').should('contain', taskTitleToRemove);

    cy.get('app-task-list')
      .contains('app-task-item', taskTitleToRemove)
      .within(() => {
        cy.get('button').contains('Remove').click();
      });

    cy.get('app-task-list').should('not.contain', taskTitleToRemove);
  });
});
