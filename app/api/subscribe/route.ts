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
        const { email } = await request.json()

        // Validate email
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Send notification email to TEDx team
        const { data, error } = await resend.emails.send({
            from: 'TEDxNIT Hamirpur <onboarding@resend.dev>', // Use verified domain in production
            to: ['voices@tedxnithamirpur.com'],
            subject: 'New Newsletter Subscription - TEDxNIT Hamirpur',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #080808; color: #ffffff;">
                    <div style="border-bottom: 3px solid #eb0028; padding-bottom: 20px; margin-bottom: 20px;">
                        <h1 style="color: #eb0028; margin: 0;">New Newsletter Subscriber! 🎉</h1>
                        <p style="color: #888; margin: 5px 0 0 0;">TEDxNIT Hamirpur Website</p>
                    </div>
                    
                    <div style="background-color: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #eb0028; margin-top: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Subscriber Details</h2>
                        <p style="color: #fff; font-size: 18px; margin: 0;">
                            <a href="mailto:${email}" style="color: #eb0028; text-decoration: none;">${email}</a>
                        </p>
                    </div>
                    
                    <div style="background-color: #0a0a0a; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="color: #888; margin: 0; font-size: 14px;">
                            Add this email to your mailing list to keep them updated about TEDxNIT Hamirpur events.
                        </p>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
                        <p style="color: #666; font-size: 12px; margin: 0;">
                            This notification was sent from the TEDxNIT Hamirpur website.
                        </p>
                    </div>
                </div>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again later.' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: true, message: 'Successfully subscribed!', id: data?.id },
            { status: 200 }
        )
    } catch (error) {
        console.error('Subscribe API error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        )
    }
}
