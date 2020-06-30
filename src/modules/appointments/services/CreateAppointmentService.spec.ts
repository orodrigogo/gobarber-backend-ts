import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

// describe - função do jest para criar categorias de jest para ficar mais organizado.
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  // it - função do jest para descrever o teste.
  it('sould be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '1232154',
      user_id: '56789',
    });

    // validação do teste.
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1232154');
  });

  it('sould not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 3, 14);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1232154',
      user_id: '56789',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232154',
        user_id: '56789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create an appointments on a paste date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '1232154',
        user_id: '56789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create an appointments with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '123123',
        user_id: '456789',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        provider_id: '123123',
        user_id: '456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
