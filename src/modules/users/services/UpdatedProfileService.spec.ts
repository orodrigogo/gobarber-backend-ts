// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdatedProfileService from './UpdatedProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updatedProfile: UpdatedProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updatedProfile = new UpdatedProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('sould be able to updated the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    const updatedUser = await updatedProfile.execute({
      user_id: user.id,
      name: 'Rodrigo Santana',
      email: 'rodrigosantana@email.com',
    });

    expect(updatedUser.name).toBe('Rodrigo Santana');
    expect(updatedUser.email).toBe('rodrigosantana@email.com');
  });

  it('sould not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Outro Usuário',
      email: 'outrousuario@email.com',
      password: '123456',
    });

    await expect(
      updatedProfile.execute({
        user_id: user.id,
        name: 'Outro Usuário',
        email: 'rodrigo@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould be able to updated the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    const updatedUser = await updatedProfile.execute({
      user_id: user.id,
      name: 'Rodrigo Santana',
      email: 'rodrigosantana@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('sould not be able to updated the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    await expect(
      updatedProfile.execute({
        user_id: user.id,
        name: 'Rodrigo Santana',
        email: 'rodrigosantana@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to updated the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    await expect(
      updatedProfile.execute({
        user_id: user.id,
        name: 'Rodrigo Santana',
        email: 'rodrigosantana@email.com',
        old_password: 'xxxxxx',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
