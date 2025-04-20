import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Interfaces para la estructura de datos actual
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
 laterales?: string; 
}

interface ClientInfo {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  notasAdicionales: string;
}

interface OrderData {
  cliente: ClientInfo;
  items: CartItem[];
  totalItems: number;
  totalPrecio: number;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener datos del pedido desde el body de la solicitud
    const orderData: OrderData = await request.json();
    console.log('Datos de pedido recibidos:', orderData);
    
    // Validar campos requeridos
    const { cliente, items } = orderData;
    
    if (!cliente.nombre || !cliente.email || !cliente.telefono || !cliente.direccion || items.length === 0) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos o el carrito está vacío' },
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

    // Generar la tabla HTML de productos para el email al dueño
    const productosHTML = items.map(item => {
      // Generar HTML para los laterales si existen
      let lateralesHTML = '';
      if (item.laterales && item.laterales.trim() !== '') {
        lateralesHTML = `
          <div style="margin-top: 5px; margin-bottom: 10px;">
            <strong>Laterales:</strong> ${item.laterales}
          </div>
        `;
      }

      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ${item.name}
            ${lateralesHTML}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.size || 'N/A'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.color || 'N/A'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">$${item.price}</td>
        </tr>
      `;
    }).join('');

    // Definir el contenido del email para la empresa
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo pedido de ${cliente.nombre} ${cliente.apellido}`,
      html: `
        <h1>Nuevo Pedido Recibido</h1>
        <h2>Información del Cliente:</h2>
        <ul>
          <li><strong>Nombre completo:</strong> ${cliente.nombre} ${cliente.apellido}</li>
          <li><strong>Email:</strong> ${cliente.email}</li>
          <li><strong>Teléfono:</strong> ${cliente.telefono}</li>
          <li><strong>Dirección:</strong> ${cliente.direccion}</li>
          <li><strong>Ciudad:</strong> ${cliente.ciudad}</li>
          <li><strong>Código Postal:</strong> ${cliente.codigoPostal}</li>

        </ul>
        
        <h2>Detalles del Pedido:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #ddd;">Producto</th>
              <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #ddd;">Tamaño</th>
              <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #ddd;">Color</th>
              <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #ddd;">Cantidad</th>
              <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #ddd;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${productosHTML}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="text-align: right; padding: 12px 8px; font-weight: bold;">Total:</td>
              <td style="padding: 12px 8px; font-weight: bold;">$${orderData.totalPrecio}</td>
            </tr>
          </tfoot>
        </table>
        
        ${cliente.notasAdicionales ? `
        <h2>Notas Adicionales:</h2>
        <p>${cliente.notasAdicionales}</p>
        ` : ''}
      `,
    };

    // Enviar el email a la empresa
    await transporter.sendMail(mailOptions);

    // Enviar confirmación al cliente
    if (cliente.email) {
      // Generar la tabla HTML de productos para el cliente (similar a la anterior)
      const clientProductosHTML = items.map(item => {
        // Generar HTML para los laterales si existen
        let lateralesHTML = '';
        if (item.laterales && item.laterales.trim() !== '') {
          lateralesHTML = `
            <div style="margin-top: 5px; margin-bottom: 10px;">
              <strong>Laterales:</strong> ${item.laterales}
            </div>
          `;
        }

        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">
              ${item.name}
              ${lateralesHTML}
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.size || 'N/A'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.color || 'N/A'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">$${item.price}</td>
          </tr>
        `;
      }).join('');

      const clientMailOptions = {
        from: process.env.EMAIL_FROM,
        to: cliente.email,
        subject: `Confirmación de pedido - Xtreme Canopy`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4a90e2;">¡Gracias por tu pedido!</h1>
            <p>Hola ${cliente.nombre},</p>
            <p>Hemos recibido tu pedido correctamente. Nos vamos a estar comunicando por whatsapp en breve. A continuación encontrarás un resumen:</p>
            
            <h2 style="color: #4a90e2; margin-top: 20px;">Resumen del Pedido:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd;">Producto</th>
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd;">Tamaño</th>
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd;">Color</th>
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd;">Cantidad</th>
                  <th style="padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${clientProductosHTML}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" style="text-align: right; padding: 12px 8px; font-weight: bold;">Total:</td>
                  <td style="padding: 12px 8px; font-weight: bold;">$${orderData.totalPrecio}</td>
                </tr>
              </tfoot>
            </table>
            
            <h2 style="color: #4a90e2; margin-top: 20px;">Información de Envío:</h2>
            <p><strong>Dirección:</strong> ${cliente.direccion}</p>
            <p><strong>Ciudad:</strong> ${cliente.ciudad}</p>
            <p><strong>Código Postal:</strong> ${cliente.codigoPostal}</p>
            
            <p style="margin-top: 30px;">Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo o llamando al +54 9 2374 10-3483.</p>
            
            <p>Saludos cordiales,</p>
            <p>El equipo de Xtreme Canopy</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
              <p>Este es un correo automático, por favor no lo respondas directamente.</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(clientMailOptions);
    }

    // Devolver respuesta exitosa
    return NextResponse.json({ 
      success: true,
      message: 'Pedido procesado correctamente'
    });
  } catch (error) {
    console.error('Error al procesar el pedido:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pedido' },
      { status: 500 }
    );
  }
}