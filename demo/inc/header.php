<?php $DOMAIN_NAME = 'yuto-nagatomo.com'; ?>
<header class="header">
    <div class="header_first">
        <div class="header_logo">
            <h1><a href="http://yuto-nagatomo.com/"><img src="/images/header/logo.png" width="230" alt="YUTO NAGATOMO - OFFICIAL WEB SITE"/></a></h1>
        </div>
        <div class="header_menu">
            <ul id="headerMenu">
                <li id="menu-news"><a href="http://<?php echo $DOMAIN_NAME; ?>/news/">NEWS</a></li>
                <li id="menu-blog"><a href="http://<?php echo $DOMAIN_NAME; ?>/blog/">BLOG</a></li>
                <li id="menu-gallery"><a href="http://<?php echo $DOMAIN_NAME; ?>/gallery/">GALLERY</a></li>
                <li id="menu-schedule"><a href="http://<?php echo $DOMAIN_NAME; ?>/schedule/">SCHEDULE</a></li>
                <li id="menu-profile"><a href="http://<?php echo $DOMAIN_NAME; ?>/profile/">PROFILE</a></li>
                <li id="menu-contact"><a href="https://<?php echo $DOMAIN_NAME; ?>/contact/">CONTACT</a></li>
            </ul>
            <div class="menu_currentArrow" id="currentArrow"></div>
        </div>
    </div>
    <nav class="header_second">
        <ul class="header_breadcrumb">
            <?php if($PAGE_NAME){ ?>
            <li class="header_breadcrumb-level1"><a href="http://<?php echo $DOMAIN_NAME; ?>">HOME</a></li>
            <li class="header_breadcrumb-level2"><a href="/<?php echo mb_strtolower($MENU_NAME) ?>/"><?php echo $MENU_NAME ?></a></li>
            <li class="header_breadcrumb-level3"><span><?php echo $PAGE_NAME ?></span></li>
            <?php } else { ?>
                <li class="header_breadcrumb-level1"><a href="http://<?php echo $DOMAIN_NAME; ?>">HOME</a></li>
                <li class="header_breadcrumb-level2"><span><?php echo $MENU_NAME ?></span></li>
            <?php } ?>
        </ul>
    </nav>
</header>