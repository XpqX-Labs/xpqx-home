'use client';

import { useState, useEffect, useRef } from 'react';

interface BootLoaderProps {
  onBootComplete: () => void;
}

interface BootMessage {
  text: string;
  delay: number;
  status?: 'loading' | 'ok' | 'failed';
}

export default function BootLoader({ onBootComplete }: BootLoaderProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bootMessages: BootMessage[] = [
    { text: '[ OK ] XPQX Terminal v2.0 Initializing...', delay: 200, status: 'ok' },
    { text: '[ OK ] Loading kernel modules...', delay: 300, status: 'ok' },
    { text: '[ OK ] Linux version 6.8.0-45-generic', delay: 80, status: 'ok' },
    { text: '[ OK ] Command line: BOOT_IMAGE=/vmlinuz root=UUID=...', delay: 60, status: 'ok' },
    { text: '[ OK ] KERNEL supported cpus:', delay: 50, status: 'ok' },
    { text: '[ OK ] Intel GenuineIntel', delay: 40, status: 'ok' },
    { text: '[ OK ] BIOS-provided physical RAM map:', delay: 60, status: 'ok' },
    { text: '[ OK ] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable', delay: 40, status: 'ok' },
    { text: '[ OK ] NX (Execute Disable) protection: active', delay: 50, status: 'ok' },
    { text: '[ OK ] SMBIOS 3.0 present.', delay: 40, status: 'ok' },
    { text: '[ OK ] DMI: XPQX Terminal/Virtual Machine, BIOS 2.0 01/01/2024', delay: 60, status: 'ok' },
    { text: '[ OK ] tsc: Fast TSC calibration using PIT', delay: 50, status: 'ok' },
    { text: '[ OK ] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved', delay: 40, status: 'ok' },
    { text: '[ OK ] e820: remove [mem 0x000a0000-0x000fffff] usable', delay: 40, status: 'ok' },
    { text: '[ OK ] last_pfn = 0x40000 max_arch_pfn = 0x400000000', delay: 50, status: 'ok' },
    { text: '[ OK ] x86/PAT: Configuration [0-7]: WB  WC  UC- UC  WB  WP  UC- WT', delay: 60, status: 'ok' },
    { text: '[ OK ] found SMP MP-table at [mem 0x000f00b0-0x000f00bf]', delay: 40, status: 'ok' },
    { text: '[ OK ] Using GB pages for direct mapping', delay: 50, status: 'ok' },
    { text: '[ OK ] RAMDISK: [mem 0x35000000-0x36ffffff]', delay: 40, status: 'ok' },
    { text: '[ OK ] ACPI: Early table checksum verification disabled', delay: 50, status: 'ok' },
    { text: '[ OK ] ACPI: RSDP 0x00000000000F0490 000014 (v00 BOCHS )', delay: 40, status: 'ok' },
    { text: '[ OK ] ACPI: RSDT 0x0000000007FE18B6 000030 (v01 BOCHS  BXPC     00000001)', delay: 40, status: 'ok' },
    { text: '[ OK ] Zone ranges:', delay: 50, status: 'ok' },
    { text: '[ OK ] DMA      [mem 0x0000000000001000-0x0000000000ffffff]', delay: 40, status: 'ok' },
    { text: '[ OK ] DMA32    [mem 0x0000000001000000-0x000000003fffffff]', delay: 40, status: 'ok' },
    { text: '[ OK ] Normal   empty', delay: 50, status: 'ok' },
    { text: '[ OK ] ACPI: PM-Timer IO Port: 0x608', delay: 40, status: 'ok' },
    { text: '[ OK ] ACPI: HPET id: 0x8086a201 base: 0xfed00000', delay: 50, status: 'ok' },
    { text: '[ OK ] smpboot: Allowing 8 CPUs, 0 hotplug CPUs', delay: 60, status: 'ok' },
    { text: '[ OK ] PM: hibernation: Registered nosave memory: [mem 0x00000000-0x00000fff]', delay: 40, status: 'ok' },
    { text: '[ OK ] [mem 0x40000000-0xfebfffff] available for PCI devices', delay: 50, status: 'ok' },
    { text: '[ OK ] clocksource: refined-jiffies: mask: 0xffffffff max_cycles: 0xffffffff', delay: 40, status: 'ok' },
    { text: '[ OK ] setup_percpu: NR_CPUS:8192 nr_cpumask_bits:8 nr_cpu_ids:8 nr_node_ids:1', delay: 60, status: 'ok' },
    { text: '[ OK ] percpu: Embedded 54 pages/cpu s184320 r8192 d28672 u262144', delay: 50, status: 'ok' },
    { text: '[ OK ] Built 1 zonelists, mobility grouping on.  Total pages: 257928', delay: 40, status: 'ok' },
    { text: '[ OK ] Policy zone: DMA32', delay: 40, status: 'ok' },
    { text: '[ OK ] Kernel command line: BOOT_IMAGE=/vmlinuz root=UUID=12345678-1234-1234-1234-123456789abc', delay: 50, status: 'ok' },
    { text: '[ OK ] Initializing CPU#0', delay: 80, status: 'ok' },
    { text: '[ OK ] Started XPQX Terminal System', delay: 120, status: 'ok' },
    { text: '[ OK ] Loaded Terminal Environment', delay: 100, status: 'ok' },
    { text: '[ OK ] System ready', delay: 200, status: 'ok' }
  ];

  useEffect(() => {
    if (currentMessage >= bootMessages.length) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onBootComplete();
        }, 400);
      }, 150);
      return;
    }

    const message = bootMessages[currentMessage];
    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, message.text]);
      setCurrentMessage(prev => prev + 1);
      
      // auto-scroll to bottom
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 10);
    }, message.delay);

    return () => clearTimeout(timer);
  }, [currentMessage, bootMessages.length, onBootComplete]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-black text-green-400 font-mono text-xs sm:text-sm p-4 overflow-y-auto boot-scrollbar">
      <div className="space-y-1">
        {displayedMessages.map((message, index) => (
          <div key={index} className="whitespace-pre-wrap break-all">
            {message.includes('[ OK ]') ? (
              <span>
                <span className="text-green-400 font-bold">[ OK ]</span>
                <span className="text-white ml-1">
                  {message.substring(6)}
                </span>
              </span>
            ) : (
              <span className="text-white">
                {message}
              </span>
            )}
          </div>
        ))}
        
        {currentMessage < bootMessages.length && (
          <div className="flex items-center mt-2">
            <span className="animate-pulse">█</span>
          </div>
        )}
        
        {isComplete && (
          <div className="mt-4 text-center">
            <div className="text-green-400 text-lg animate-pulse">
              ██████████████████████████
            </div>
            <div className="text-white mt-2">
              Boot sequence complete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
