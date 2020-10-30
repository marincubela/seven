- Create s3 bucket
- Make it Static web hosting

```
Properties -> Static web hosting
```

- Set IAM profile
- Set up sync command

```
"deploy": "npm run build && aws s3 sync build/ s3://<ime-bucketa> --acl public-read",
```

- Set up premissions

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicReadAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<ime-bucketa>/*"
        }
    ]
}
```

## 🎉 Frontend done 🎉

# Backend

- create new bucket
- create new ec2 instance
  - ubuntu (free)
- install node and npm on ec2 instance

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo bash nodesource_setup.sh

sudo apt update
sudo apt install npm
```

- Set IAM profile
- Set up sync command

```
"deploy": "npm run build && aws s3 sync build/ s3://<ime-bucketa> --acl public-read",
```

- Set up premissions

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicReadAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<ime-bucketa>/*"
        }
    ]
}
```

Database https://towardsdatascience.com/creating-and-connecting-a-postgresql-database-with-amazons-relational-database-service-rds-dcc9db0cd37f
