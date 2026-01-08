import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
    try {
        // Check for API key at runtime
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured')
            return NextResponse.json(
                { error: 'Email service is not configured. Please contact the administrator.' },
                { status: 500 }
            )
        }

        const resend = new Resend(process.env.RESEND_API_KEY)
        const { name, email, phone, interest, message } = await request.json()

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'TEDxNIT Hamirpur <onboarding@resend.dev>', // Use verified domain in production
            to: ['voices@tedxnithamirpur.com'],
            replyTo: email,
            subject: `TEDxNIT Hamirpur - ${interest || 'Contact Form'} from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #080808; color: #ffffff;">
                    <div style="border-bottom: 3px solid #eb0028; padding-bottom: 20px; margin-bottom: 20px;">
                        <h1 style="color: #eb0028; margin: 0;">New Contact Form Submission</h1>
                        <p style="color: #888; margin: 5px 0 0 0;">TEDxNIT Hamirpur Website</p>
                    </div>
                    
                    <div style="background-color: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #eb0028; margin-top: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Contact Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #888; width: 100px;">Name:</td>
                                <td style="padding: 10px 0; color: #fff;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888;">Email:</td>
                                <td style="padding: 10px 0; color: #fff;"><a href="mailto:${email}" style="color: #eb0028;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888;">Phone:</td>
                                <td style="padding: 10px 0; color: #fff;">${phone || 'Not provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888;">Interest:</td>
                                <td style="padding: 10px 0; color: #fff;">${interest || 'Not specified'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #0a0a0a; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #eb0028; margin-top: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Message</h2>
                        <p style="color: #fff; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
                        <p style="color: #666; font-size: 12px; margin: 0;">
                            This email was sent from the TEDxNIT Hamirpur contact form.
                        </p>
                    </div>
                </div>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Failed to send email. Please try again later.' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: true, message: 'Email sent successfully', id: data?.id },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact API error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        )
    }
}
