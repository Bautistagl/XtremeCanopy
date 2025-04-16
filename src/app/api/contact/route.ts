import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Interfaz para los datos del formulario de contacto
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener datos del formulario de contacto desde el body de la solicitud
    const formData: ContactFormData = await request.json();
    console.log('Datos de contacto recibidos:', formData);
    
    // Validar campos requeridos
    const { name, email, subject, message } = formData;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Definir el contenido del email para la empresa
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <h2>Información del Remitente:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        
        <h2>Asunto:</h2>
        <p>${subject}</p>
        
        <h2>Mensaje:</h2>
        <p>${message}</p>
      `,
    };

    // Enviar el email a la empresa
    await transporter.sendMail(mailOptions);

    // Enviar confirmación al remitente
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Confirmación de tu mensaje - Xtreme Canopy`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4a90e2;">¡Gracias por contactarnos!</h1>
          <p>Hola ${name},</p>
          <p>Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible.</p>
          
          <h2 style="color: #4a90e2; margin-top: 20px;">Resumen de tu mensaje:</h2>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
          
          <p style="margin-top: 30px;">Si tienes alguna consulta adicional, no dudes en contactarnos.</p>
          
          <p>Saludos cordiales,</p>
          <p>El equipo de Xtreme Canopy</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>Este es un correo automático, por favor no lo respondas directamente.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    // Devolver respuesta exitosa
    return NextResponse.json({ 
      success: true,
      message: 'Mensaje enviado correctamente'
    });
  } catch (error) {
    console.error('Error al procesar el mensaje de contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    );
  }
}