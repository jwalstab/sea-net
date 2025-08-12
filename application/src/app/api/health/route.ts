import { HTTP_STATUS } from 'lib/api/http';
import { NextResponse } from 'next/server';

/**
 * Handles GET requests for the health endpoint.
 * @returns {NextResponse} JSON response with status 'ok'.
 */
export const GET = async () => {
  // Quick database connection test
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful!');
    
    await prisma.$disconnect();
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
  
  return NextResponse.json({ status: 'ok' }, { status: HTTP_STATUS.OK });
};
