import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileServices from './ShowProfileServices';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileServices;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileServices(fakeUsersRepository);
  });

  it('sould be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Rodrigo Gonçalves');
    expect(profile.email).toBe('rodrigo@email.com');
  });

  it('sould not be able show the profile non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
