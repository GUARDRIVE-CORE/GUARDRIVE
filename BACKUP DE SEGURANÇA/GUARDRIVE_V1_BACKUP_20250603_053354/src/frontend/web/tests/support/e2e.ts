import '@cypress/code-coverage/support';
import './commands';

beforeEach(() => {
  // Limpar estado entre testes
  cy.clearLocalStorage();
  cy.clearCookies();

  // Interceptações globais
  cy.intercept('GET', `${Cypress.env('apiUrl')}/health`, {
    statusCode: 200,
    body: { status: 'healthy' }
  }).as('healthCheck');

  // Configurar headers padrão
  cy.intercept('**/*', (req) => {
    req.headers['x-test-environment'] = Cypress.env('environment');
  });
});

// Tratamento global de erros não tratados
Cypress.on('uncaught:exception', (err) => {
  console.error('Erro não tratado:', err);
  return false;
});

