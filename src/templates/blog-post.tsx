import * as React from "react"
import { Link, graphql } from "gatsby"

import dayjs from "dayjs"
import reltime from "dayjs/plugin/relativeTime"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { ProcessedPost } from "../components/BlogPostProcessor"
import FlowLogo from "../svgs/flow-logo.svg"
import logoUrl from "../images/combination-mark__multi-blue.png"

dayjs.extend(reltime)

const BlogPostTemplate = ({ data: { previous, next, post, popularArticles }, pageContext }) => {
    const postTags = post.tags.filter(tag => tag.type === "tag")
    return (
        <Layout headerTheme="light">
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <div className="header-info">
                        {postTags?.length > 0 ? (
                            <section className="tags-wrap">
                                {postTags.map(tag => {
                                    return (
                                        <span className="blog-tag">{tag.name}</span>
                                    )
                                })}
                            </section>
                        ) : null}
                        <span className="blog-post-date">
                            Date: {post.publishedAt}
                        </span>
                        <h1>
                            {post.title}
                        </h1>
                        <Bio authors={post.authors} />
                    </div>
                    <div className="hero-image">
                        {post.hero ? (
                            <GatsbyImage
                                alt={post.title}
                                image={
                                    post.hero.localFile.childImageSharp
                                        .gatsbyImageData
                                }
                                loading="eager"
                            />
                        ) : null}
                    </div>
                </header>
                <div className="post-description">{post && post.description}</div>
                {post.body && (
                    <section className="blog-post-content">

                        <ProcessedPost
                            body={post.body.data.childHtmlRehype.html}
                            popularArticles={popularArticles}
                        />
                        <div className="post-content">
                            <div dangerouslySetInnerHTML={{ __html: post.body.data.childHtmlRehype.html }} />
                            <hr />
                            <nav className="blog-post-nav">
                                {previous && previous.slug !== post.slug && (
                                    <Link to={`/${previous.slug}`} rel="prev">
                                        ← {previous.title}
                                    </Link>
                                )}
                                <div style={{ flexBasis: 20 }} />
                                {next && next.slug !== post.slug && (
                                    <Link to={`/${next.slug}`} rel="next">
                                        {next.title} →
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </section >
                )}


                {/* To Do */}

                {/* <div className="popular-articles mobile-only">
                    <h3>Popular Articles</h3>
                    <ul>
                        <li>
                            <StaticImage
                                quality={90}
                                placeholder="none"
                                alt="debezium alternatives"
                                src="../images/popular-articles/debezium_alternatives_cover_image_748007bac5.avif"
                                width={48}
                                height={48}
                                layout="fixed"
                                className="icon-image"
                            />
                            <Link to="/debezium-alternatives">Why you should re-consider Debezium: Challenges & Alts</Link>
                        </li>
                        <li>
                            <StaticImage
                                quality={90}
                                placeholder="none"
                                alt="Guide to SQL Server CDC"
                                src="../images/popular-articles/eccbd3_sql_server_cdc_8a24e6c7c2.avif"
                                width={48}
                                height={48}
                                layout="fixed"
                                className="icon-image"
                            />
                            <Link to="/guide-change-data-capture-sql-server">Guide to SQL Server CDC</Link>
                        </li>
                        <li>
                            <StaticImage
                                quality={90}
                                placeholder="none"
                                alt="The Real-time Data Landscape"
                                src="../images/popular-articles/16eed6_Real_time_Data_Landscape_3_78206a6d80.avif"
                                width={48}
                                height={48}
                                layout="fixed"
                                className="icon-image"
                            />
                            <Link to="/the-real-time-data-landscape">The Real-time Data Landscape</Link>
                        </li>
                        <li>
                            <StaticImage
                                quality={90}
                                placeholder="none"
                                alt="Don't Use Kafka as a Data Lake"
                                src="../images/popular-articles/c5ca61_kafka_as_data_lake_a361174828.avif"
                                width={48}
                                height={48}
                                layout="fixed"
                                className="icon-image"
                            />
                            <Link to="/kafka-as-data-lake">Don't Use Kafka as a Data Lake, Do this instead</Link>
                        </li>
                    </ul>
                </div> */}
                <div className="sidebar-cta mobile-only">
                    <h3>Start streaming your data for free</h3>
                    <Link to="https://dashboard.estuary.dev/register" className="pipeline-link">Build a Pipeline</Link>
                </div>
            </article>
        </Layout>
    )
}

export const Head = ({
    data: {
        post,
        site: {
            siteMetadata: { siteUrl },
        },
    },
}) => {
    const mappedAuthors = post.authors.map(author => ({
        name: author.name,
        url: author.link,
        image: author.picture && {
            "@type": "ImageObject",
            url: `${siteUrl}/${author.picture.localFile.childImageSharp.fixed.src}`,
        },
    }))

    const postTags = post.tags
        .filter(tag => tag.type === "tag")
        .map(t => t.name)
    return (
        <>
            <Seo
                title={post.title}
                description={post.description ?? ""}
                url={`${siteUrl}/${post.slug}`}
                image={
                    post.hero &&
                    `${siteUrl}${post.hero.localFile.childImageSharp.meta_img.src}`
                }
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `${siteUrl}/${post.slug}`,
                    },
                    headline: post.title,
                    description: post.description ?? "",
                    image:
                        post.hero &&
                        `${siteUrl}${post.hero.localFile.childImageSharp.meta_img.src}`,
                    author:
                        post.authors.length > 1
                            ? mappedAuthors
                            : mappedAuthors[0],
                    keywords: postTags,
                    publisher: {
                        "@type": "Organization",
                        name: "Estuary",
                        logo: {
                            "@type": "ImageObject",
                            url: `${siteUrl}${logoUrl}`,
                        },
                    },
                    datePublished: post.machineReadablePublishDate,
                })}
            </script>
        </>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                siteUrl
            }
        }
        post: strapiBlogPost(id: { eq: $id }) {
            title: Title
            publishedAt(formatString: "MMMM D, YYYY")
            machineReadablePublishDate: publishedAt(formatString: "YYYY-MM-DD")
            description: Description
            slug: Slug
            body: Body {
                data {
                    childHtmlRehype {
                        html
                      }
                }
            }
            Description
            authors {
                name: Name
                picture: Picture {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                placeholder: BLURRED
                            )
                            fixed(width: 60) {
                                src
                            }
                        }
                    }
                }
                link: Link
            }
            hero: Hero {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            layout: FULL_WIDTH
                            placeholder: BLURRED
                            # aspectRatio: 2
                            formats: [AUTO, WEBP, AVIF]
                        )
                        meta_img: fixed(width: 500) {
                            src
                        }
                        # Further below in this doc you can learn how to use these response images
                    }
                }
            }
            tags: tags {
                name: Name
                type: Type
            }
        }
        popularArticles:  allStrapiBlogPost(
            sort: { publishedAt: DESC }
            filter: {tags: {elemMatch: {Name: {eq: "Popular" }}}}
        ) {
            nodes {
                updatedAt
                slug: Slug
                id
                hero: Hero {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                width: 400
                                placeholder: BLURRED
                                aspectRatio: 1.7
                                formats: [AUTO, WEBP, AVIF]
                            )
                            # Further below in this doc you can learn how to use these response images
                        }
                    }
                }
                title: Title
                tags {
                    Name
                    Slug
                    Type
                    IsTab
                }
            }
        }
        previous: strapiBlogPost(id: { eq: $previousPostId }) {
            title: Title
            slug: Slug
            authors {
                name: Name
                picture: Picture {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                placeholder: BLURRED
                            )
                        }
                    }
                }
                link: Link
            }
        }
        next: strapiBlogPost(id: { eq: $nextPostId }) {
            title: Title
            slug: Slug
            authors {
                name: Name
                picture: Picture {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: CONSTRAINED
                                placeholder: BLURRED
                            )
                        }
                    }
                }
                link: Link
            }
        }
    }
`
