'use client';

import { useEffect } from 'react';

interface FetchIpProps {
  onFetch: (ip: string) => void;
}

export default function FetchIp({ onFetch }: FetchIpProps) {
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        // try multiple IP services for reliability
        const services = [
          'https://api.ipify.org?format=json',
          'https://ipapi.co/json/',
          'https://httpbin.org/ip'
        ];

        for (const service of services) {
          try {
            const response = await fetch(service);
            const data = await response.json();
            
            // different services return IP in different formats
            const ip = data.ip || data.origin || data.query;
            
            if (ip && typeof ip === 'string') {
              onFetch(ip);
              return;
            }
          } catch (error) {
            console.warn(`Failed to fetch IP from ${service}:`, error);
            continue;
          }
        }
        
        // fallback to localhost if all services fail
        onFetch('127.0.0.1');
      } catch (error) {
        console.error('Error fetching IP address:', error);
        onFetch('localhost');
      }
    };

    fetchIpAddress();
  }, [onFetch]);

  return null;
}
