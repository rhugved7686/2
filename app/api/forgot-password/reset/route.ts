import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    // Validate inputs
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Find the most recent password reset request
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        userId: user.id,
        otp,
        used: false,
        otpExpiry: {
          gt: new Date(), // Check if OTP hasn't expired
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!passwordReset) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Mark OTP as used
    await prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Error in reset-password:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 