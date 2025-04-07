import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  tamano: string;
  color: string;
  cantidad: string;
};

// Export a POST function instead of default export
export async function POST(request: NextRequest) {
  try {
    // Get form data from request body
    const formData: FormData = await request.json();
    console.log('Datos recibidos:', formData);
    
    // Validate required fields
    if (!formData.nombre || !formData.email || !formData.telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nueva solicitud de cotización: Gazebo Aluminio HEX 40`,
      html: `
        <h1>Nueva solicitud de cotización</h1>
        <h2>Producto: Gazebo Aluminio HEX 40</h2>
        <h3>Datos del cliente:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${formData.nombre}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Teléfono:</strong> ${formData.telefono}</li>
          <li><strong>Empresa:</strong> ${formData.empresa || 'No especificada'}</li>
        </ul>
        <h3>Detalles del pedido:</h3>
        <ul>
          <li><strong>Tamaño:</strong> ${formData.tamano || 'No especificado'}</li>
          <li><strong>Color:</strong> ${formData.color || 'No especificado'}</li>
          <li><strong>Cantidad:</strong> ${formData.cantidad || 'No especificada'}</li>
        </ul>
        <h3>Mensaje:</h3>
        <p>${formData.mensaje || 'Sin mensaje adicional'}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation to client (optional)
    if (formData.email) {
      const clientMailOptions = {
        from: process.env.EMAIL_FROM,
        to: formData.email,
        subject: `Confirmación de solicitud de cotización - Gazebo Aluminio HEX 40`,
        html: `
          <h1>Hemos recibido tu solicitud de cotización</h1>
          <p>Hola ${formData.nombre},</p>
          <p>Gracias por contactarnos. Hemos recibido tu solicitud de cotización para el producto Gazebo Aluminio HEX 40.</p>
          <p>Nos pondremos en contacto contigo a la brevedad para brindarte toda la información que necesitas.</p>
          <h3>Detalles de tu solicitud:</h3>
          <ul>
            <li><strong>Producto:</strong> Gazebo Aluminio HEX 40</li>
            <li><strong>Tamaño:</strong> ${formData.tamano || 'No especificado'}</li>
            <li><strong>Color:</strong> ${formData.color || 'No especificado'}</li>
            <li><strong>Cantidad:</strong> ${formData.cantidad || 'No especificada'}</li>
          </ul>
          <p>Si tienes alguna pregunta adicional, no dudes en contactarnos.</p>
          <p>Saludos cordiales,</p>
          <p>El equipo de [Tu Empresa]</p>
        `,
      };

      await transporter.sendMail(clientMailOptions);
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}