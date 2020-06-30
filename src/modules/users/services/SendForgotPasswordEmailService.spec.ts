import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  // Gatilho do jest antes de cada um dos testes.
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('sould be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'rodrigo@email.com',
    });

    // verificando se a função de envio de email foi chamada.
    expect(sendMail).toHaveBeenCalled();
  });

  it('sould not be able to recover a non-existing user password', async () => {
    // verificando se a função de envio de email foi chamada.
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'rodrigo@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould genarate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'rodrigo@email.com',
    });

    // verificando se a função de envio de token foi chamada para o usuário.
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
