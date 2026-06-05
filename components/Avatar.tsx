import { profile } from "@/data/profile";

// Shows the real photo if profile.photo is set, otherwise a styled
// gradient/initials placeholder. Swap by adding /public/avatar.jpg and
// setting profile.photo = "/avatar.jpg".
export function Avatar({ className = "" }: { className?: string }) {
  if (profile.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={profile.photo}
        alt={profile.name}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div
      aria-label={profile.name}
      role="img"
      className={`grid shrink-0 place-items-center overflow-hidden bg-gradient-brand font-display font-bold leading-none text-white ${className}`}
    >
      <span className="leading-none drop-shadow">{profile.initials}</span>
    </div>
  );
}
