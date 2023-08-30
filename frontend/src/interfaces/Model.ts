export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avtar: {
    public_url: string;
    url: string;
  };
  createdAt: Date;
}

export interface IComment {
  _id: string;
  user: IUser["_id"];
  comment: string;
}

export interface ILike {
  _id: string;
  user: IUser["_id"];
}

export interface IPost {
  _id: string;
  caption: string;
  image: {
    public_url: string;
    url: string;
  };
  owner: IUser["_id"];
  createdAt: Date;
  likes: ILike[];
  comments: IComment[];
}
