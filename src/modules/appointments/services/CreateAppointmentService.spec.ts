import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

// describe - função do jest para criar categorias de jest para ficar mais organizado.
describe('CreateAppointment', () => {
  // it - função do jest para descrever o teste.
  it('sould be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1232154',
    });

    // validação do teste.
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1232154');
  });

  it('sould not be able to create two appointments on the same time', () => {
    // expect(1 + 2).toBe(3);
  });
});
