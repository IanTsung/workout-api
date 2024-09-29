import { Request, Response, NextFunction } from 'express';

const requestQueue: { [key: string]: number[] } = {};
const THROTTLE_LIMIT = 10; // Max 10 requests
const TIME_WINDOW = 10000; // 10 seconds

export const throttle = (req: Request, res: Response, next: NextFunction) => {
  const ip : any = req.ip;
  const now = Date.now();

  if (!requestQueue[ip]) {
    requestQueue[ip] = [];
  }

  requestQueue[ip] = requestQueue[ip].filter((timestamp: any) => now - timestamp < TIME_WINDOW);

  if (requestQueue[ip].length < THROTTLE_LIMIT) {
    requestQueue[ip].push(now);
    next();
  } else {
    res.status(429).send(`Too many requests, please try again after ${Math.ceil(TIME_WINDOW / 1000)} seconds.`);
  }
};

// Clean up requestQueue for a set interval
export const intervalId = setInterval(() => {
  const now = Date.now();
  for (const ip in requestQueue) {
    requestQueue[ip] = requestQueue[ip].filter((timestamp) => now - timestamp < TIME_WINDOW);
    if (requestQueue[ip].length === 0) {
      delete requestQueue[ip];
    }
  }
}, TIME_WINDOW);