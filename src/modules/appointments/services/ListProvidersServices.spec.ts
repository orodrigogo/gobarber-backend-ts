import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersServices from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersServices;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersServices(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('sould be able tolist the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves 1',
      email: 'rodrigo1@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves 2',
      email: 'rodrigo2@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Rodrigo Gonçalves 3',
      email: 'rodrigo3@email.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
