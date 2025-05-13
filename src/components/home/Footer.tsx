import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-muted/50 border-t border-border py-12'>
      <div className='container px-4 md:px-6 mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-6 md:mb-0'>
            <Link to='/' className='flex items-center gap-2'>
              <span className='bg-gradient-to-r from-brand-600 to-brand-400 rounded-md p-1.5'>
                <BookOpen className='h-5 w-5 text-white' strokeWidth={2.5} />
              </span>
              <span className='font-semibold text-xl tracking-tight'>
                EduWhisperer
              </span>
            </Link>
            <p className='text-muted-foreground mt-2 text-sm'>
              AI-powered study assistant for better learning outcomes
            </p>
          </div>

          <div className='grid gap-8 text-sm mr-12'>
            <div>
              <h4 className='font-semibold mb-3'>Features</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    to='/planner'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Study Planner
                  </Link>
                </li>
                <li>
                  <Link
                    to='/summarizer'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Document Summarizer
                  </Link>
                </li>
                <li>
                  <Link
                    to='/quiz'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Quiz Generator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground'>
          <p>
            &copy; {new Date().getFullYear()} EduWhisperer. All rights reserved.
          </p>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <a href='#' className='hover:text-foreground'>
              Twitter
            </a>
            <a href='#' className='hover:text-foreground'>
              LinkedIn
            </a>
            <a href='#' className='hover:text-foreground'>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
