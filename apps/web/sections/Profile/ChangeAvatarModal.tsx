import { AnimatePresence, motion } from 'framer-motion';
import avatarUnset from '../../public/image/avatars/avatar-unset.svg';
import avatar1 from '../../public/image/avatars/avatar-1.svg';
import avatar2 from '../../public/image/avatars/avatar-2.svg';
import avatar3 from '../../public/image/avatars/avatar-3.svg';
import avatar4 from '../../public/image/avatars/avatar-4.svg';
import avatar5 from '../../public/image/avatars/avatar-5.svg';
import avatar6 from '../../public/image/avatars/avatar-6.svg';
import avatar7 from '../../public/image/avatars/avatar-7.svg';
import avatar8 from '../../public/image/avatars/avatar-8.svg';
import avatar9 from '../../public/image/avatars/avatar-9.svg';
import avatar10 from '../../public/image/avatars/avatar-10.svg';
import avatar11 from '../../public/image/avatars/avatar-11.svg';
import avatar12 from '../../public/image/avatars/avatar-12.svg';
import avatar13 from '../../public/image/avatars/avatar-13.svg';
import avatar14 from '../../public/image/avatars/avatar-14.svg';
import avatar15 from '../../public/image/avatars/avatar-15.svg';
import avatar16 from '../../public/image/avatars/avatar-16.svg';
import avatar17 from '../../public/image/avatars/avatar-17.svg';
import avatar18 from '../../public/image/avatars/avatar-18.svg';
import avatar19 from '../../public/image/avatars/avatar-19.svg';
import avatar20 from '../../public/image/avatars/avatar-20.svg';
import avatar21 from '../../public/image/avatars/avatar-21.svg';
import Image from 'next/image';
import { api } from '../../trpc/react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { useNotificationStore } from '@zknoid/sdk/components/shared/Notification/lib/notificationStore';

const zknoidAvatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
  avatar21,
];

export default function ChangeAvatarModal({
  onClose,
  currentAvatarId,
}: {
  onClose: (newAvatarId?: number) => void;
  currentAvatarId: number;
}) {
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const { mutate: setAvatarId } = api.http.accounts.setAvatar.useMutation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        className={
          'fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0'
        }
        onClick={() => onClose()}
      >
        <div
          className={
            'relative flex flex-col rounded-[0.521vw] bg-[#373737] p-[2.083vw] gap-[0.781vw]'
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text-[1.667vw] font-museo font-medium">Edit Avatar</span>
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1.302vw] h-[1.302vw] hover:opacity-80 cursor-pointer"
              onClick={() => onClose()}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5585 14.6799L22.8746 24.996L24.996 22.8746L14.6799 12.5585L24.996 2.24241L22.8746 0.121094L12.5585 10.4372L2.12132 0L0 2.12132L10.4372 12.5585L0 22.9957L2.12132 25.1171L12.5585 14.6799Z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
          <div className="grid grid-cols-5 gap-[0.26vw]">
            {zknoidAvatars.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!networkStore.address) return;

                  if (currentAvatarId === index + 1) {
                    notificationStore.create({
                      type: 'error',
                      message: 'You already pick this avatar!',
                    });
                    return;
                  }
                  setAvatarId({
                    userAddress: networkStore.address,
                    avatarId: index + 1,
                  });
                  onClose(index + 1);
                  notificationStore.create({
                    type: 'success',
                    message: 'Avatar changed!',
                  });
                }}
                className="hover:opacity-80 cursor-ponter w-[5.208vw] h-[5.208vw] overflow-hidden"
              >
                <Image src={item} alt="avatar" className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
