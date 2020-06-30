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
    const appointment = await createAppointment.execute({
      date: new Date(),
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

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232154',
        user_id: '56789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
