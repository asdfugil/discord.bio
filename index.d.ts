declare const _default: {
    /**
     * Fetch profile by user id or slug
     */
    fetchProfile: (slugOrID: string) => Promise<Profile>;
    /**
     * Fetch discord connections by slug or user id
     */
    fetchDiscordConnections: (slugOrID: string) => Promise<DiscordConnection[]>;
    /**
     * Fetch user connections by slug or user id
     */
    fetchUserConnections: (slugOrID: string) => Promise<UserConnections>;
};
export = _default;
declare type ProfileSettings = {
    id: number;
    name: string;
    user_id: string;
    created_at: string | null;
    view_count: number;
    slug_id: string;
    status: string | null;
    description: string | null;
    location: string | null;
    gender: string | null;
    birthday: string | null;
    email: string | null;
    occupation: string | null;
};
declare type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
};
declare type Profile = {
    success: boolean;
    settings: ProfileSettings;
    discord: User;
};
declare type DiscordConnection = {
    id: number;
    connection_type: string;
    name: string;
    url: string | null;
    icon: string;
};
declare type UserConnections = {
    github: UserConnection;
    website: UserConnection;
    instagram: UserConnection;
    snapchat: UserConnection;
    linkedin: UserConnection;
};
declare type UserConnection = {
    name: string | null;
};
